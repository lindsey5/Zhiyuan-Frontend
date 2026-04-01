import type { Path, UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { productService } from "../service/productService";

export const checkIfProductNameExist = async <T extends { product_name: string }>(
    setError: UseFormSetError<T>,
    clearErrors: UseFormClearErrors<T>,
    data: T,
    accessToken: string,
    id?: string
): Promise<boolean> => {
    try {
        clearErrors("product_name" as Path<T>);

        const response = await productService.searchProduct({
            params: { product_name: data.product_name },
            id,
            accessToken: accessToken || "",
        });

        if (response.success) {
            setError("product_name" as Path<T>, {
                type: "manual",
                message: "Product name already exists",
            });
            return true; 
        }

        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const checkIfVariantFieldExist = async <
    T extends { variants: Record<string, any>[] }, 
    K extends keyof T["variants"][number] & ("sku" | "variant_name")
>(
    setError: UseFormSetError<T>,
    clearErrors: UseFormClearErrors<T>,
    field: K,
    errorMessage: string,
    variants: T["variants"],
    accessToken: string,
    includeId?: boolean
): Promise<boolean> => {
    try {
        for (const [index, variant] of variants.entries()) {
            clearErrors(`variants.${index}.${field}` as Path<T>);
            const response = await productService.searchVariant({
                params: { [field]: variant[field] },
                id: includeId ? variant._id : undefined,
                accessToken,
            });

            if (response.success) {
                setError(`variants.${index}.${field}` as Path<T>, {
                    type: "manual",
                    message: errorMessage,
                });

                return true; 
            }
        }

        return false; 
    } catch (err) {
        console.error(err);
        return false; // fail-safe
    }
};