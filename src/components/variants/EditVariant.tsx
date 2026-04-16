import { X, Image, Upload } from "lucide-react";
import type { Variant } from "../../types/variant.type";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { editVariantSchema, type EditVariantFormData } from "../../schemas/variantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { fileToBase64 } from "../../utils/utils";
import TextField from "../ui/TextField";
import { useVariant } from "../../hooks/useVariant";
import { checkIfVariantFieldExist } from "../../utils/validation";
import { promiseToast } from "../../utils/sileo";
import GoldButton from "../ui/GoldButton";

interface EditVariantProps {
    variant: Variant | null;
    open: boolean;
    close: () => void;
}

export default function EditVariant ({ variant, open, close } : EditVariantProps) {
    const { updateVariant } = useVariant();
    const { 
        register, 
        handleSubmit, 
        reset, 
        watch, 
        setValue, 
        formState: { errors },
        setError,
        clearErrors
    } = useForm<EditVariantFormData>({ resolver: zodResolver(editVariantSchema)});

    useEffect(() => {
        if(variant) reset(variant)
    }, [variant])

    const image = watch('image_url');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await fileToBase64(file);
            setValue('image_url', base64);
        } catch (error) {
            console.error("Failed to convert file to Base64:", error);
        }
    };

    const onClose = () => {
        if(updateVariant.isPending) return;

        clearErrors();
        close();
    }

    const onSubmit: SubmitHandler<EditVariantFormData> = async (data) => {
        const isConfirm = confirm("Are you sure you want to update this product?");

        if (!isConfirm) return;

        const isSkuExist = await checkIfVariantFieldExist(
            setError,
            clearErrors,
            "sku",
            "SKU already exists",
            data,
            data._id || ""
        )

        if(isSkuExist) return;

        promiseToast(updateVariant.mutateAsync({ 
            data, 
            id: data._id || ""
        }))
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            className="w-[90vw] max-w-150"
        >
            <Card
                className="max-h-[70vh] overflow-y-auto"
            >
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold">Edit Variant</h2>
                    <Button 
                        className="border-none p-0"
                        icon={<X size={20}/>}
                        onClick={onClose}
                    />
                </div>
                <form className="flex flex-col lg:flex-row items-center lg:items-start gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center w-50 h-50 space-y-3">
                        <div className="flex items-center justify-center overflow-hidden rounded">
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
                            id="variant"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="variant" className="cursor-pointer">
                            <span className="border border-[var(--border-panel)] text-sm inline-flex items-center gap-2 px-4 py-2 rounded">
                                <Upload size={16} />
                                Upload Image
                            </span>
                        </label>
                        <span className="text-xs text-red-500">{errors.image_url ? errors.image_url.message : ""}</span>
                    </div>
                    <div className="w-full lg:w-auto flex flex-col gap-3 flex-1">
                        <TextField 
                            error={errors.variant_name ? errors.variant_name.message : ""}
                            label="Variant Name"
                            placeholder="Enter variant name"
                            registration={register('variant_name')}
                        />
                        <TextField 
                            error={errors.sku ? errors.sku.message : ""}
                            label="SKU"
                            placeholder="Enter SKU"
                            registration={register('sku')}
                        />
                        <TextField 
                            error={errors.price ? errors?.price.message : ""}
                            label="Price"
                            placeholder="Enter Price"
                            type="number"
                            registration={register('price', {
                                setValueAs: value => Number(value)
                            })}
                        />
                        <TextField 
                            error={errors.stock ? errors?.stock.message : ""}
                            label="Stock"
                            placeholder="Stock"
                            type="number"
                            onKeyDown={(e) => {
                                if (e.key === "." || e.key === "," || e.key === "e" || e.key === "-") {
                                e.preventDefault();
                                }
                            }}
                            registration={register('stock', {
                                setValueAs: value => Number(value)
                            })}
                        />
                        <GoldButton 
                            type="submit"
                            disabled={updateVariant.isPending}
                        >Save Changes</GoldButton>
                    </div>
                </form>
            </Card>
        </Modal>
    )
}