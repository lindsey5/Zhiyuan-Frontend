import type { UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { CreateProductFormData } from "../../../schemas/productSchema";
import { useState } from "react";
import { fileToBase64 } from "../../../utils/utils";
import Thumbnail from "../../ui/Thumbnail";

interface AddThumbnailProps {
    reset: UseFormReset<CreateProductFormData>;
    setValue: UseFormSetValue<CreateProductFormData>;
    watch: UseFormWatch<CreateProductFormData>;
    error?: string;
}

export default function AddProductThumbnail ({ setValue, reset, watch, error } : AddThumbnailProps) {
    const [thumbnailSrc, setThumbnailSrc] = useState<string>("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setValue("thumbnail", file);
        try {
            const base64 = await fileToBase64(file);
            setThumbnailSrc(base64);
        } catch (error) {
            console.error("Failed to convert file to Base64:", error);
        }
    };

    const handleRemove = () => {
        reset({ ...watch(), thumbnail: undefined });
        setThumbnailSrc("");
    };

    return (
        <Thumbnail 
            remove={handleRemove}
            thumbnailSrc={thumbnailSrc}
            handleFileChange={handleFileChange}
            error={error}
        />
    )
}