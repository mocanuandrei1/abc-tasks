import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  password: z.string().min(1, { message: "Campul este obligatoriu" }).max(50),
});

export const userSchema = z.object({
  id: z.number().int().positive(), // Integer and must be positive
  name: z.string().min(1, "Numele este obligatoriu"), // Non-empty string
  username: z.string().min(1, "Username-ul este obligatoriu"), // Non-empty string
  password: z.string().min(8, "Parola trebuie sa aiba minim 8 caractere"), // Minimum 8 characters for password
  isAdmin: z.boolean(), // Boolean value for admin status
  createdAt: z.date(), // Date validation
  nodes: z.array(z.number().int().positive()), // Array of Node IDs (integers)
});

export const nodeSchema = z.object({
  id: z.number().int().positive(), // Integer and must be positive
  name: z.string().min(1, "Node name is required"), // Non-empty string
  users: z.array(z.number().int().positive()), // Array of User IDs (integers)
});
