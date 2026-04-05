import type { Path, UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { productService } from "../service/productService";
import { userService } from "../service/userService";
import type { CreateUserFormData, UpdateUserFormData } from "../schemas/userSchema";
import type { EditVariantFormData } from "../schemas/variantSchema";

export const checkIfEmailExist = async (
    setError: UseFormSetError<CreateUserFormData | UpdateUserFormData>,
    clearErrors: UseFormClearErrors<CreateUserFormData | UpdateUserFormData>,
    email: string,
    id?: string,
) =>  {
    try{
        clearErrors("email");
        const response = await userService.isEmailExist({id, email});
        if (response.success) {
            setError("email", {
                type: "manual",
                message: "Email already exists",
            });
            return true; 
        }

        return false;
    }catch(err){
        console.error(err);
        return false;
    }
}

export const checkIfProductNameExist = async <T extends { product_name: string }>(
    setError: UseFormSetError<T>,
    clearErrors: UseFormClearErrors<T>,
    data: T,
    id?: string
): Promise<boolean> => {
    try {
        clearErrors("product_name" as Path<T>);

        const response = await productService.searchProduct({
            params: { product_name: data.product_name },
            id,
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

export const checkIfVariantsFieldExist = async <
    T extends { variants: Record<string, any>[] }, 
    K extends keyof T["variants"][number] & ("sku" | "variant_name")
>(
    setError: UseFormSetError<T>,
    clearErrors: UseFormClearErrors<T>,
    field: K,
    errorMessage: string,
    variants: T["variants"],
    includeId?: boolean,
): Promise<boolean> => {
    try {
        for (const [index, variant] of variants.entries()) {
            clearErrors(`variants.${index}.${field}` as Path<T>);
            const response = await productService.searchVariant({
                params: { [field]: variant[field] },
                id: includeId ? variant._id : undefined,
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


export const checkIfVariantFieldExist = async(
    setError: UseFormSetError<EditVariantFormData>,
    clearErrors: UseFormClearErrors<EditVariantFormData>,
    field: "sku" | "variant_name",
    errorMessage: string,
    variant: EditVariantFormData,
    id: string,
): Promise<boolean> => {
    try {
        clearErrors(field);
        const response = await productService.searchVariant({
            params: { [field]: variant[field] },
            id,
        });

        if (response.success) {
            setError(`${field}`, {
                type: "manual",
                message: errorMessage,
            });

            return true; 
        }

        return false; 
    } catch (err) {
        console.error(err);
        return false; // fail-safe
    }
};
