import z from "zod";

const MAX_FILE_SIZE = 500 * 1024 * 1024;

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

    image: z
        .instanceof(File, { message: "Image is required" })
        .refine((file) => file !== undefined, { message: "Image is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Image must be less than 500MB",
        }),
});

export const createProductSchema = z.object({
    product_name: z.string()
        .min(3, "Product name must be at least 3 characters")
        .max(100, "Product name must not exceed 100 characters"),

    description: z.string()
        .min(5, "Description must be at least 5 characters")
        .max(1000, "Description must not exceed 1000 characters"),

    thumbnail: z
        .instanceof(File, { message: "Thumbnail is required" })
        .refine((file) => file !== undefined, { message: "Thumbnail is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "Image must be less than 500MB",
        }),
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

const editVariantSchema = z.object({
    id: z.number().int('Id must be a whole number').optional(),
    product_id: z.number().int('Product id must be a whole number').optional(),
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
    image_url: z.string().min(1, 'Image is required'),
    image_public_id: z.string().min(1, 'Image public id is required').optional(),
});

export const editProductSchema = z.object({
    id: z.number().int('Id must be a whole number'),
    product_name: z.string()
        .min(3, "Product name must be at least 3 characters")
        .max(100, "Product name must not exceed 100 characters"),

    description: z.string()
        .min(5, "Description must be at least 5 characters")
        .max(1000, "Description must not exceed 1000 characters"),

    thumbnail_url: z.string().min(1, 'Thumbnail is required'),
    thumbnail_public_id: z.string().optional(),
    category: z.string().min(1, "Category is required."),
    createdAt: z.string(),
    variants: z.array(editVariantSchema).min(1, "At least one variant is required"),
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

export type EditProductFormData = z.infer<typeof editProductSchema>;