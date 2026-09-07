import prisma from "../config/prisma.js";
import { nextId } from "../utils/next-id.js";

const receiptTransactionTypeId = Number(
  process.env.INVENTORY_RECEIPT_TRANSACTION_TYPE_ID || 1,
);

const productInclude = {
  categories: true,
  types_of_products: true,
  inventory: true,
};

function toProductResponse(product) {
  return {
    id: product.id,
    name: product.name,
    sku: product.inventory?.sku ?? null,
    category: product.categories
      ? { id: product.categories.id, name: product.categories.name }
      : null,
    typeOfProduct: product.types_of_products
      ? { id: product.types_of_products.id, name: product.types_of_products.type }
      : null,
    unit: product.inventory?.unit ?? null,
    pricePerKg: product.price_per_kg,
    url: product.url,
    availableWeight: product.inventory?.available_weight ?? 0,
    updated: product.inventory?.updated ?? null,
  };
}

async function ensureLookups(transaction, categoryId, typeOfProductId) {
  const [category, typeOfProduct] = await Promise.all([
    transaction.categories.findUnique({ where: { id: categoryId } }),
    transaction.types_of_products.findUnique({ where: { id: typeOfProductId } }),
  ]);

  if (!category || !typeOfProduct) {
    return false;
  }

  return true;
}

export async function listLookups(req, res) {
  const [categories, typesOfProducts] = await Promise.all([
    prisma.categories.findMany({ orderBy: { name: "asc" } }),
    prisma.types_of_products.findMany({ orderBy: { type: "asc" } }),
  ]);

  return res.json({
    categories: categories.map(({ id, name }) => ({ id, name })),
    typesOfProducts: typesOfProducts.map(({ id, type }) => ({ id, name: type })),
  });
}

export async function listProducts(req, res) {
  const products = await prisma.products.findMany({
    include: productInclude,
    orderBy: { name: "asc" },
  });

  return res.json({ products: products.map(toProductResponse) });
}

export async function createProduct(req, res) {
  const {
    name,
    sku,
    categoryId,
    typeOfProductId,
    unit,
    pricePerKg,
    url,
    initialQuantity,
    remarks,
  } = req.body;

  const existingInventory = await prisma.inventory.findFirst({ where: { sku } });
  if (existingInventory) {
    return res.status(409).json({ error: "That SKU is already in use" });
  }

  try {
    const product = await prisma.$transaction(async (transaction) => {
      if (!(await ensureLookups(transaction, categoryId, typeOfProductId))) {
        const error = new Error("Category or product type was not found");
        error.statusCode = 400;
        throw error;
      }

      const productId = await nextId(transaction.products);
      const inventoryId = await nextId(transaction.inventory);
      const createdProduct = await transaction.products.create({
        data: {
          id: productId,
          name,
          category_id: categoryId,
          type_of_product: typeOfProductId,
          url: url || null,
          price_per_kg: pricePerKg ?? null,
        },
      });

      await transaction.inventory.create({
        data: {
          id: inventoryId,
          product_id: productId,
          sku,
          available_weight: initialQuantity,
          unit,
          updated: new Date(),
        },
      });

      if (initialQuantity > 0) {
        const purchaseId = await nextId(transaction.purchases);
        const transactionId = await nextId(transaction.inventory_transactions);
        await transaction.purchases.create({
          data: {
            id: purchaseId,
            product_id: productId,
            weight_bought: initialQuantity,
            date_time: new Date(),
          },
        });
        await transaction.inventory_transactions.create({
          data: {
            id: transactionId,
            transaction_type_id: receiptTransactionTypeId,
            reference_table: "purchases",
            reference_id: purchaseId,
            quantity_in: initialQuantity,
            quantity_out: 0,
            balance_after: initialQuantity,
            created_at: new Date(),
            updated_at: new Date(),
            remarks: remarks || "Opening inventory",
          },
        });
      }

      return transaction.products.findUnique({
        where: { id: createdProduct.id },
        include: productInclude,
      });
    });

    return res.status(201).json({ product: toProductResponse(product) });
  } catch (error) {
    if (error?.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    if (error?.code === "P2002") {
      return res.status(409).json({ error: "That product or SKU already exists" });
    }
    throw error;
  }
}
