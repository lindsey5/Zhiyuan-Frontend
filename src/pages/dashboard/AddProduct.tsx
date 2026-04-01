import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, } from "react-hook-form";
import { createProductSchema, type CreateProductFormData } from "../../schemas/productSchema";
import TextField from "../../components/ui/TextField";
import RichTextEditor from "../../components/ui/RichTextEditor";
import Dropdown from "../../components/ui/Dropdown";
import { useCategory } from "../../hooks/useCategory";
import AddProductThumbnail from "../../components/user/add-product/AddProductThumbnail";
import Button from "../../components/ui/Button";
import AddProductVariant from "../../components/user/add-product/AddProductVariant";
import GoldButton from "../../components/ui/GoldButton";
import { useProduct } from "../../hooks/useProduct";
import { promiseToast } from "../../utils/sileo";
import { useAuthStore } from "../../lib/store/authStore";
import { checkIfProductNameExist, checkIfVariantFieldExist } from "../../utils/validation";

export default function AddProduct () {
    const accessToken = useAuthStore(state => state.accessToken);
    const { getCategories } = useCategory();
    const { data } = getCategories({ search: '' });
    const categories = data?.categories.map(category => ({ label: category.name, value: category.name}))|| [];
    const { createProduct } = useProduct();
    const { 
        register, 
        handleSubmit, 
        reset, 
        watch, 
        setValue, 
        formState: { errors },
        setError,
        clearErrors
    } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            product_name: "",
            description: "",
            category: "",
            variants: []
        }
    });

    const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
        const isProductNameExist = await checkIfProductNameExist(
            setError,
            clearErrors,
            data,
            accessToken || ""
        )

        const isSkuExist = await checkIfVariantFieldExist(
            setError,
            clearErrors,
            "sku",
            "SKU already exists",
            data.variants,
            accessToken || ""
        )

        if(isProductNameExist || isSkuExist) return;

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
        const callBack = createProduct.mutateAsync({ formData, accessToken: accessToken || "" });
        promiseToast(callBack);

    }

    const removeVariant = (index: number) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this variant?");

        if (!isConfirmed) return;

        const filteredVariants = (watch("variants") || []).filter((_, i) => i !== index);
        setValue("variants", filteredVariants);
    };

    const addVariant = () => {
        reset({
            thumbnail: watch('thumbnail'),
            description: watch('description') || "",
            category: watch('category') || "",
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
        <PageContainer 
            title="Add Product" 
            description="Enter product details to add a new item"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 relative items-start">
                <AddProductThumbnail 
                    reset={reset}
                    setValue={setValue}
                    watch={watch}
                    error={errors.thumbnail?.message}
                />
                <Card className="w-full lg:w-auto lg:flex-1 flex flex-col space-y-5">
                    <h1 className="font-bold text-lg">Product Details</h1>
                    <TextField 
                        label="Product Name"
                        placeholder="Enter product name"
                        error={errors.product_name?.message}
                        registration={register("product_name")}
                    />
                    <div>
                        <RichTextEditor 
                            label="Description"
                            value={watch('description')}
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
                    <div className="border border-[var(--border-panel)] mt-10"/>
                    <h1 className="font-bold text-lg">Variants</h1>
                    {errors.variants?.message && <span className="text-xs text-red-500">{errors.variants.message}</span>}
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
                            disabled={createProduct.isPending}
                        />
                        <GoldButton 
                            type="submit" 
                            className="flex-1"
                            disabled={createProduct.isPending}
                        >Save</GoldButton>
                    </div>
                </Card>
            </form>
        </PageContainer>
    )
}