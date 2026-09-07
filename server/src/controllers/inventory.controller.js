import prisma from "../config/prisma.js";
import { nextId } from "../utils/next-id.js";

const receiptTransactionTypeId = Number(
  process.env.INVENTORY_RECEIPT_TRANSACTION_TYPE_ID || 1,
);

function toInventoryResponse(item) {
  return {
    id: item.id,
    productId: item.product_id,
    name: item.products?.name ?? "Unnamed product",
    sku: item.sku,
    unit: item.unit,
    availableWeight: item.available_weight ?? 0,
    updated: item.updated,
    category: item.products?.categories?.name ?? null,
    typeOfProduct: item.products?.types_of_products?.type ?? null,
  };
}

export async function listInventory(req, res) {
  const inventory = await prisma.inventory.findMany({
    include: {
      products: {
        include: { categories: true, types_of_products: true },
      },
    },
    orderBy: { updated: "desc" },
  });

  return res.json({ inventory: inventory.map(toInventoryResponse) });
}

export async function receiveStock(req, res) {
  const productId = Number(req.params.productId);
  const { quantity, remarks } = req.body;

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const inventory = await transaction.inventory.findUnique({
        where: { product_id: productId },
      });

      if (!inventory) {
        const error = new Error("Product inventory was not found");
        error.statusCode = 404;
        throw error;
      }

      const currentWeight = inventory.available_weight ?? 0;
      const balanceAfter = currentWeight + quantity;
      const now = new Date();
      const purchaseId = await nextId(transaction.purchases);
      const transactionId = await nextId(transaction.inventory_transactions);

      await transaction.inventory.update({
        where: { id: inventory.id },
        data: { available_weight: balanceAfter, updated: now },
      });

      await transaction.purchases.create({
        data: {
          id: purchaseId,
          product_id: productId,
          weight_bought: quantity,
          date_time: now,
        },
      });

      await transaction.inventory_transactions.create({
        data: {
          id: transactionId,
          transaction_type_id: receiptTransactionTypeId,
          reference_table: "purchases",
          reference_id: purchaseId,
          quantity_in: quantity,
          quantity_out: 0,
          balance_after: balanceAfter,
          created_at: now,
          updated_at: now,
          remarks: remarks || "Stock received",
        },
      });

      return transaction.inventory.findUnique({
        where: { id: inventory.id },
        include: {
          products: {
            include: { categories: true, types_of_products: true },
          },
        },
      });
    });

    return res.status(201).json({ inventory: toInventoryResponse(result) });
  } catch (error) {
    if (error?.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    throw error;
  }
}
