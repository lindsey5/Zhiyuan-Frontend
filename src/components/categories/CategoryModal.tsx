import Card from "../ui/Card"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema, type CategoryFormData } from "../../schemas/categorySchema"
import TextField from "../ui/TextField"
import { useCategory } from "../../hooks/useCategory"
import Button from "../ui/Button"
import { X } from "lucide-react"
import { promiseToast } from "../../utils/sileo"
import type { Category } from "../../types/category"
import { useEffect } from "react"
import GoldButton from "../ui/GoldButton"

type CategoryModalProps = {
    open: boolean
    onClose: () => void
    category?: Category
}

export default function CategoryModal({ open, onClose, category }: CategoryModalProps) {
    const { createCategory, updateCategory } = useCategory();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    });

    const close = () => {
        onClose();
        reset({ name: undefined });
    }

    const onSubmit : SubmitHandler<CategoryFormData> = async (data) => {
        const callBack = category ? updateCategory.mutateAsync({ id: category.id, data }) : createCategory.mutateAsync(data);
        promiseToast(callBack)
    }

    useEffect(() => {
        if(category) reset({ name: category.name })
    }, [category])

    if (!open) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-5">
            <Card className="w-full max-w-md">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold font-sans">{category ? 'Edit' : 'Add'} Category</h2>
                    <Button 
                        className="border-none p-0"
                        icon={<X size={20}/>}
                        onClick={close}
                        disabled={createCategory.isPending || updateCategory.isPending}
                    />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Category Name"
                        placeholder="e.g. Billiard Ball"
                        registration={register("name")}
                        error={errors.name?.message}
                        disabled={createCategory.isPending}
                    />

                    <div className="flex justify-end gap-3 pt-3">
                        <GoldButton
                            className="text-sm"
                            disabled={createCategory.isPending || updateCategory.isPending}
                        >{category ? 'Save changes' : 'Create'}</GoldButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}