import type { UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { EditProductFormData } from "../../../schemas/productSchema";
import { fileToBase64 } from "../../../utils/utils";
import Thumbnail from "../../ui/Thumbnail";

interface EditThumbnailProps {
    reset: UseFormReset<EditProductFormData>;
    setValue: UseFormSetValue<EditProductFormData>;
    watch: UseFormWatch<EditProductFormData>;
    error?: string;
}

export default function EditProductThumbnail ({ setValue, reset, watch, error } : EditThumbnailProps) {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await fileToBase64(file);
            setValue('thumbnail_url', base64)
        } catch (error) {
            console.error("Failed to convert file to Base64:", error);
        }
    };

    const handleRemove = () => {
        reset({ ...watch(), thumbnail_url: "" });
    };

    return (
        <Thumbnail 
            remove={handleRemove}
            thumbnailSrc={watch('thumbnail_url')}
            handleFileChange={handleFileChange}
            error={error}
        />
    )
}