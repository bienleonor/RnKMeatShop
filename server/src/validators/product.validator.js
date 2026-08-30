import { z } from "zod";

const positiveNumber = z.coerce.number().finite().positive();
const nonNegativeNumber = z.coerce.number().finite().min(0);

export const productCreateSchema = z.object({
  name: z.string().trim().min(1).max(150),
  sku: z.string().trim().min(1).max(100),
  categoryId: z.coerce.number().int().positive(),
  typeOfProductId: z.coerce.number().int().positive(),
  unit: z.string().trim().min(1).max(30),
  pricePerKg: positiveNumber.optional(),
  url: z.string().trim().max(500).optional().or(z.literal("")),
  initialQuantity: nonNegativeNumber.default(0),
  remarks: z.string().trim().max(500).optional().or(z.literal("")),
});

export const productUpdateSchema = productCreateSchema
  .omit({ sku: true, initialQuantity: true, remarks: true })
  .partial();

export const stockReceiptSchema = z.object({
  quantity: positiveNumber,
  remarks: z.string().trim().max(500).optional().or(z.literal("")),
});
