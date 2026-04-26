import z from "zod";

export const editVariantSchema = z.object({
    _id: z.string().optional(),
    product_id: z.string().optional(),
    variant_name: z.string()
        .min(3, "Variant name must be at least 3 characters")
        .max(100, "Variant name must not exceed 100 characters"),

    price: z.number()
        .positive("Price must not be blank, negative or 0"),

    stock: z.number()
        .int("Stock must be a whole number")
        .positive('Stock is required'),

    sku: z.string()
        .min(3, "SKU must be at least 3 characters")
        .max(100, "SKU must not exceed 100 characters"),
    image_url: z.string().min(1, 'Image is required'),
    image_public_id: z.string().optional(),
});

export type EditVariantFormData = z.infer<typeof editVariantSchema>;