import z from "zod";

const createVariantSchema = z.object({
    variant_name: z.string()
        .min(3, "Variant name must be at least 3 characters")
        .max(100, "Variant name must not exceed 100 characters"),

    price: z.number()
        .positive("Variant price must be positive"),

    stock: z.number()
        .int("Stock must be a whole number")
        .positive("Stock must be positive"),

    sku: z.string()
        .min(3, "SKU must be at least 3 characters")
        .max(100, "SKU must not exceed 100 characters"),

    image: z.instanceof(File, { message: "Image is required" })
});

export const createProductSchema = z.object({
    product_name: z.string()
        .min(3, "Product name must be at least 3 characters")
        .max(100, "Product name must not exceed 100 characters"),

    description: z.string()
        .min(5, "Description must be at least 5 characters")
        .max(100, "Description must not exceed 100 characters"),

    thumbnail: z.instanceof(File, { message: "Thumbnail is required" }),
    category: z.string().min(1, "Category is required."),

    variants: z.array(createVariantSchema).min(1, "At least one variant is required"),
}).superRefine((data, ctx) => {
    const skuMap = new Map<string, number>();
    const variantNameMap = new Map<string, number>();

    data.variants.forEach((variant, index) => {
        const sku = (variant.sku || "").trim().toLowerCase();
        const variantName = (variant.variant_name || "").trim().toLowerCase();

        if (sku) {
            if (skuMap.has(sku)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "SKU must be unique",
                    path: ["variants", index, "sku"],
                });
            } else {
                skuMap.set(sku, index);
            }
        }

        if (variantName) {
            if (variantNameMap.has(variantName)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Variant name must be unique",
                    path: ["variants", index, "variant_name"],
                });
            } else {
                variantNameMap.set(variantName, index);
            }
        }
    });
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;