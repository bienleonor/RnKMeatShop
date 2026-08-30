import prisma from "../config/prisma.js";
import { nextId } from "../utils/next-id.js";

const lookupConfig = {
  categories: {
    label: "category",
    model: "categories",
    field: "name",
    relationField: "category_id",
    responseName: "name",
  },
  typesOfProducts: {
    label: "type of product",
    model: "types_of_products",
    field: "type",
    relationField: "type_of_product",
    responseName: "name",
  },
};

function getConfig(resource) {
  return lookupConfig[resource];
}

function toResponse(record, config) {
  return { id: record.id, name: record[config.field] };
}

async function findByName(model, field, name, excludeId) {
  const records = await model.findMany({
    where: {
      [field]: { not: null },
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
  });

  return records.find(
    (record) => record[field]?.trim().toLocaleLowerCase() === name.toLocaleLowerCase(),
  );
}

export async function listLookups(req, res) {
  const [categories, typesOfProducts] = await Promise.all([
    prisma.categories.findMany({ orderBy: { name: "asc" } }),
    prisma.types_of_products.findMany({ orderBy: { type: "asc" } }),
  ]);

  return res.json({
    categories: categories.map((record) => toResponse(record, lookupConfig.categories)),
    typesOfProducts: typesOfProducts.map((record) => toResponse(record, lookupConfig.typesOfProducts)),
  });
}

export async function createLookup(req, res) {
  const config = getConfig(req.params.resource);
  const name = req.body.name;
  const model = prisma[config.model];

  if (await findByName(model, config.field, name)) {
    return res.status(409).json({ error: `That ${config.label} already exists` });
  }

  try {
    const record = await model.create({
      data: { id: await nextId(model), [config.field]: name },
    });
    return res.status(201).json({ item: toResponse(record, config) });
  } catch (error) {
    if (error?.code === "P2002") {
      return res.status(409).json({ error: `That ${config.label} already exists` });
    }
    throw error;
  }
}

export async function updateLookup(req, res) {
  const config = getConfig(req.params.resource);
  const id = Number(req.params.id);
  const name = req.body.name;
  const model = prisma[config.model];
  const existing = await model.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ error: `The ${config.label} was not found` });
  }
  if (await findByName(model, config.field, name, id)) {
    return res.status(409).json({ error: `That ${config.label} already exists` });
  }

  const record = await model.update({
    where: { id },
    data: { [config.field]: name },
  });
  return res.json({ item: toResponse(record, config) });
}

export async function deleteLookup(req, res) {
  const config = getConfig(req.params.resource);
  const id = Number(req.params.id);
  const model = prisma[config.model];
  const existing = await model.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ error: `The ${config.label} was not found` });
  }

  const productCount = await prisma.products.count({
    where: { [config.relationField]: id },
  });
  if (productCount > 0) {
    return res.status(409).json({
      error: `This ${config.label} is used by ${productCount} product${productCount === 1 ? "" : "s"}`,
    });
  }

  await model.delete({ where: { id } });
  return res.status(204).send();
}
