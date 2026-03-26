import z from "zod";

// Variant schema
const createVariantSchema = z.object({
  variant_name: z.coerce.string()
    .min(3, "Variant name must be at least 3 characters")
    .max(100, "Variant name must not exceed 100 characters"),

  price: z.coerce.number()
    .positive("Price must be positive"),

  stock: z.coerce.number()
    .int("Stock must be a whole number")
    .positive("Stock must be positive"),

  sku: z.coerce.string()
    .min(3, "SKU must be at least 3 characters")
    .max(100, "SKU must not exceed 100 characters"),

  image: z.instanceof(File, { message: "Image is required" }),
});

// Product schema
export const createProductSchema = z.object({
  product_name: z.coerce.string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name must not exceed 100 characters"),

  description: z.coerce.string()
    .min(5, "Description must be at least 5 characters")
    .max(100, "Description must not exceed 100 characters"),

  thumbnail: z.instanceof(File, { message: "Thumbnail File is required" }),
  category: z.coerce.string().min(1, "Category is required"),

  variants: z.array(createVariantSchema).min(1, "At least one variant is required"),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;