import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, } from "react-hook-form";
import { editProductSchema, type EditProductFormData } from "../../schemas/productSchema";
import TextField from "../../components/ui/TextField";
import RichTextEditor from "../../components/ui/RichTextEditor";
import Dropdown from "../../components/ui/Dropdown";
import { useCategory } from "../../hooks/useCategory";
import Button from "../../components/ui/Button";
import GoldButton from "../../components/ui/GoldButton";
import { useProduct } from "../../hooks/useProduct";
import { checkIfProductNameExist, checkIfVariantFieldExist } from "../../utils/validation";
import EditProductThumbnail from "../../components/edit-product/EditProductThumbnail";
import EditProductVariant from "../../components/edit-product/EditProductVariant";
import { useParams } from "react-router-dom";
import { promiseToast } from "../../utils/sileo";
import { useEffect } from "react";
import EditProductSkeleton from "../../components/edit-product/EditProductSkeleton";

export default function EditProduct () {
    const params = useParams();
    const id = params.id;
    const { getCategories } = useCategory();
    const { data } = getCategories({ search: '' });
    const categories = data?.categories.map(category => ({ label: category.name, value: category.name}))|| [];
    const { updateProduct, getProductById } = useProduct();
    const { data : product, isFetching } = getProductById(id || "");
    const { 
        register, 
        handleSubmit, 
        reset, 
        watch, 
        setValue, 
        formState: { errors },
        setError,
        clearErrors
    } = useForm<EditProductFormData>({
        resolver: zodResolver(editProductSchema)
    });

    useEffect(() => {
        reset(product?.product)
    }, [product])

    if(!id) return null;

    const onSubmit: SubmitHandler<EditProductFormData> = async (data) => {
        const isConfirm = confirm("Are you sure you want to update this product?");

        if (!isConfirm) return;

        const isProductNameExist = await checkIfProductNameExist(
            setError,
            clearErrors,
            data,
            id
        )

        const isSkuExist = await checkIfVariantFieldExist(
            setError,
            clearErrors,
            "sku",
            "SKU already exists",
            data.variants,
            true
        )

        if(isProductNameExist || isSkuExist) return;

        const callBack = updateProduct.mutateAsync({ 
            data, 
            id: id, 
        })
        promiseToast(callBack)

    }

    const removeVariant = (index: number) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this variant?");

        if (!isConfirmed) return;

        const filteredVariants = (watch("variants") || []).filter((_, i) => i !== index);
        setValue("variants", filteredVariants);
    };

    const addVariant = () => {
        reset({
            _id: watch('_id'),
            thumbnail_url: watch('thumbnail_url'),
            description: watch('description') || "",
            category: watch('category') || "",
            createdAt: watch('createdAt'),
            variants : [
                ...(watch("variants") || []),
                { price: 0, sku: "", stock: 0, variant_name: "", image_url: "" }
            ]
        })
        setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        }, 50);
    }

    return (
        <PageContainer 
            title="Edit Product"
            description="Update product details and information"
        >
            {isFetching ? <EditProductSkeleton /> : 
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10 items-start">
                <EditProductThumbnail
                    reset={reset}
                    setValue={setValue}
                    watch={watch}
                    error={errors.thumbnail_url?.message}
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
                            value={watch('description')}
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
                    <div className="border border-[var(--border-panel)] mt-10"/>
                    <h1 className="font-bold text-lg">Variants</h1>
                    {errors.variants?.message && <span className="text-xs text-red-500">{errors.variants.message}</span>}
                    {watch('variants')?.map((_, index) => (
                        <EditProductVariant 
                            key={index}
                            errors={errors}
                            index={index}
                            register={register}
                            setValue={setValue}
                            watch={watch}
                            removeVariant={removeVariant}
                        />
                    ))}
                    <Button 
                        type="button"
                        label="Add Variant"
                        className="font-bold"
                        onClick={addVariant}
                        disabled={updateProduct.isPending}
                    />
                    <div className="flex gap-10 w-full pt-10">
                        <GoldButton 
                            type="submit" 
                            className="flex-1"
                            disabled={updateProduct.isPending}
                        >Save Changes</GoldButton>
                    </div>
                </Card>
            </form>}
        </PageContainer>
    )
}