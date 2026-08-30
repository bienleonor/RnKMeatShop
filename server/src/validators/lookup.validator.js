import { z } from "zod";

export const lookupNameSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export const lookupIdSchema = z.coerce.number().int().positive();
