import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Campul este obligatoriu" })
    .max(50)
    .trim(),
  password: z.string().min(1, { message: "Campul este obligatoriu" }).max(50),
});

export const createUserSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu"), // Non-empty string
  username: z.string().min(1, "Username-ul este obligatoriu"), // Non-empty string
  password: z.string().min(8, "Parola trebuie sa aiba minim 8 caractere"), // Minimum 8 characters for password
  isAdmin: z.boolean(), // Boolean value for admin status
  nodes: z.array(z.number().int().positive()), // Array of Node IDs (integers)
});

export const updateUserSchema = z.object({
  id: z.number().int().positive(), // Integer and must be positive
  name: z.string().min(1, "Numele este obligatoriu"), // Non-empty string
  username: z.string().min(1, "Username-ul este obligatoriu"), // Non-empty string
  password: z.string().min(8, "Parola trebuie sa aiba minim 8 caractere"), // Minimum 8 characters for password
  isAdmin: z.boolean(), // Boolean value for admin status
  nodes: z.array(z.number().int().positive()), // Array of Node IDs (integers)
});

export const nodeSchema = z.object({
  id: z.number().int().positive(), // Integer and must be positive
  name: z.string().min(1, "Numele nodului este obligatoriu"), // Non-empty string
});

export const multipleNodesSchema = z.object({
  nodes: z.array(
    z.object({
      id: z.number().int().positive(),
      name: z.string().min(1, "Numele nodului este obligatoriu"),
    })
  ),
});

export const mermaidSchema = z.object({
  diagram: z.string().min(1, "Diagrama este obligatorie"), // Non-empty string
});

export const userSettingsSchema = z.object({
  name: z.string().min(1, "Numele este obligatoriu"), // Non-empty string
  username: z.string().min(1, "Username-ul este obligatoriu"), // Non-empty string
  password: z.string().min(8, "Parola trebuie sa aiba minim 8 caractere"), // Minimum 8 characters for password
  id: z.number().int().positive(), // Integer and must be positive
});
