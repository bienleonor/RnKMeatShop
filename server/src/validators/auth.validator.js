import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

export const registerSchema = z.object({
  username: z.string().trim().min(3).max(100),
  name: z.string().trim().min(1).max(150),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  password: z.string().min(8).max(200),
});