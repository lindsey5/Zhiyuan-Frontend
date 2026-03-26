import * as z from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name must not exceed 100 characters"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;