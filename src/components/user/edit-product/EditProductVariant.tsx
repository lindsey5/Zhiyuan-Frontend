import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import TextField from "../../ui/TextField";
import type { EditProductFormData } from "../../../schemas/productSchema";
import { fileToBase64 } from "../../../utils/utils";
import { Upload, Image } from "lucide-react";
import Button from "../../ui/Button";

interface EditProductVariant {
    register: UseFormRegister<EditProductFormData>;
    errors: FieldErrors<EditProductFormData>;
    setValue: UseFormSetValue<EditProductFormData>;
    index: number;
    watch: UseFormWatch<EditProductFormData>;
    removeVariant: (index: number) => void;
}

export default function EditProductVariant ({ errors, register, index, setValue, removeVariant, watch } : EditProductVariant) {
    const image = watch(`variants.${index}.image_url`);
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await fileToBase64(file);
            setValue(`variants.${index}.image_url`, base64);
        } catch (error) {
            console.error("Failed to convert file to Base64:", error);
        }
    };
    
    return (
        <div className="w-full pb-5 border-b border-[var(--border-panel)] my-5 space-y-5">
            <div className="flex flex-col items-center w-50 h-50 space-y-3">
                <div className="w-full flex items-center justify-center overflow-hidden rounded">
                    {image ? 
                        <img
                            src={image}
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
                <span className="text-xs text-red-500">{errors.variants ? errors.variants[index]?.image_url?.message : ""}</span>
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