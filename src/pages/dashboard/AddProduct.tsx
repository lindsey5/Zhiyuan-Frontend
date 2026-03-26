import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { createProductSchema, type CreateProductFormData } from "../../schemas/productSchema";
import TextField from "../../components/ui/TextField";
import RichTextEditor from "../../components/ui/RichTextEditor";
import Dropdown from "../../components/ui/Dropdown";
import { useCategory } from "../../hooks/useCategory";
import AddProductThumbnail from "../../components/add-product/AddProductThumbnail";
import Button from "../../components/ui/Button";
import AddProductVariant from "../../components/add-product/AddProductVariants";
import GoldButton from "../../components/ui/GoldButton";

export default function AddProduct () {
    const { getCategories } = useCategory();
    const { data } = getCategories({ search: '' });
    const categories = data?.categories.map(category => ({ label: category.name, value: category.name}))|| [];
    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema) as Resolver<CreateProductFormData>,
        defaultValues: {
            product_name: "",
            description: "",
            category: "",
            variants: []
        }
    });

    const onSubmit: SubmitHandler<CreateProductFormData> = (data) => {
        const formData = new FormData();
        const variant_images  = data.variants.map(variant => variant.image);
        const variants = data.variants.map(variant => {
            const { image, ...rest } = variant;
            return rest;
        })
        formData.append("product_name", data.product_name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("thumbnail", data.thumbnail);
        formData.append("variants", JSON.stringify(variants));
        variant_images.forEach((file) => {
            formData.append("variant_images", file);
        });
    }

    const removeVariant = (index: number) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this variant?");

        if (!isConfirmed) return;

        const filteredVariants = (watch("variants") || []).filter((_, i) => i !== index);
        setValue("variants", filteredVariants);
    };

    const addVariant = () => {
        reset({
            variants : [
                ...(watch("variants") || []),
                { price: 0, sku: "", stock: 0, variant_name: "", image: undefined }
            ]
        })
        setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        }, 50);
    }

    const resetAll = () => {
        const isConfirmed = window.confirm("Are you sure you want to reset?");

        if (!isConfirmed) return;

        reset();
    }

    return (
        <PageContainer title="Add Product">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 relative items-start">
                <AddProductThumbnail 
                    reset={reset}
                    setValue={setValue}
                    watch={watch}
                    error={errors.thumbnail?.message}
                />
                <Card className="w-full lg:w-auto lg:flex-1 flex flex-col space-y-5">
                    <h1 className="font-bold text-lg">Product Details</h1>
                    <div className="border border-[var(--border-panel)]"/>
                    <TextField 
                        label="Product Name"
                        placeholder="Enter product name"
                        error={errors.product_name?.message}
                        registration={register("product_name")}
                    />
                    <div>
                        <RichTextEditor 
                            label="Description"
                            onChange={(value) => setValue('description', value)}
                            error={errors.description?.message}
                        />
                    </div>
                    <div>
                         <Dropdown 
                            onChange={(value) => setValue('category', value)}
                            options={categories}
                            value={watch('category')}
                            title="Category"
                            error={errors.category?.message}
                        />
                    </div>
                    <h1 className="font-bold text-lg mt-10">Variants</h1>
                    {errors.variants?.message && <span className="text-xs text-red-500">{errors.variants.message}</span>}
                    <div className="border border-[var(--border-panel)]"/>
                    {watch('variants')?.map((_, index) => (
                        <AddProductVariant 
                            errors={errors}
                            index={index}
                            register={register}
                            setValue={setValue}
                            removeVariant={removeVariant}
                        />
                    ))}
                    <Button 
                        type="button"
                        label="Add Variant"
                        className="font-bold"
                        onClick={addVariant}
                    />
                    <div className="flex gap-10 w-full pt-10">
                        <Button 
                            className="flex-1"
                            type="button"
                            label="Reset"
                            onClick={resetAll}
                        />
                        <GoldButton type="submit" className="flex-1">Save</GoldButton>
                    </div>
                </Card>
            </form>
        </PageContainer>
    )
}