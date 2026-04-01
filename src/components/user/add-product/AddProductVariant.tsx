import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import TextField from "../../ui/TextField";
import type { CreateProductFormData } from "../../../schemas/productSchema";
import { useState } from "react";
import { fileToBase64 } from "../../../utils/utils";
import { Upload, Image } from "lucide-react";
import Button from "../../ui/Button";

interface AddProductVariant {
    register: UseFormRegister<CreateProductFormData>;
    errors: FieldErrors<CreateProductFormData>;
    setValue: UseFormSetValue<CreateProductFormData>;
    index: number;
    removeVariant: (index: number) => void;
}

export default function AddProductVariant ({ errors, register, index, setValue, removeVariant } : AddProductVariant) {
    const [imageSrc, setImageSrc] = useState<string>("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setValue(`variants.${index}.image`, file);
        try {
            const base64 = await fileToBase64(file);
            setImageSrc(base64);
        } catch (error) {
            console.error("Failed to convert file to Base64:", error);
        }
    };
    
    return (
        <div className="w-full pb-5 border-b border-[var(--border-panel)] my-5 space-y-5">
            <div className="flex flex-col items-center w-50 h-50 space-y-3">
                <div className="w-full flex items-center justify-center overflow-hidden rounded">
                    {imageSrc ? 
                        <img
                            src={imageSrc}
                            alt="variant image"
                            className="object-contain w-full h-full"
                        /> : 
                        <Image className="w-full h-full" strokeWidth={1}/>
                    }
                </div>
                <input
                    type="file"
                    accept="image/*"
                    id={`variant-${index}`}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <label htmlFor={`variant-${index}`} className="cursor-pointer">
                    <span className="border border-[var(--border-panel)] text-sm inline-flex items-center gap-2 px-4 py-2 rounded">
                        <Upload size={16} />
                        Upload Image
                    </span>
                </label>
                <span className="text-xs text-red-500">{errors.variants ? errors.variants[index]?.image?.message : ""}</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
                <TextField 
                    error={errors.variants ? errors.variants[index]?.variant_name?.message : ""}
                    label="Variant Name"
                    placeholder="Enter variant name"
                    registration={register(`variants.${index}.variant_name`)}
                />
                <TextField 
                    error={errors.variants ? errors.variants[index]?.sku?.message : ""}
                    label="SKU"
                    placeholder="Enter SKU"
                    registration={register(`variants.${index}.sku`)}
                />
                <TextField 
                    error={errors.variants ? errors.variants[index]?.price?.message : ""}
                    label="Price"
                    placeholder="Enter Price"
                    type="number"
                    registration={register(`variants.${index}.price`, {
                        setValueAs: value => Number(value)
                    })}
                />
                <TextField 
                    error={errors.variants ? errors.variants[index]?.stock?.message : ""}
                    label="Stock"
                    placeholder="Stock"
                    type="number"
                    registration={register(`variants.${index}.stock`, {
                        setValueAs: value => Number(value)
                    })}
                />
            </div>
            <Button 
                type="button"
                label="Remove"
                className="bg-red-600 text-white"
                onClick={() => removeVariant(index)}
            />
        </div>
    )
}