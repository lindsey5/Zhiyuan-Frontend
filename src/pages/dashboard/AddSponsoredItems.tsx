import { useMemo, useState, type SetStateAction } from "react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import type { SortOption } from "../../types/type";
import { formatDate } from "../../utils/utils";
import CustomizedTable from "../../components/ui/Table";
import type { Variant } from "../../types/variant.type";
import GoldButton from "../../components/ui/GoldButton";
import { errorToast, successToast } from "../../utils/sileo";
import ItemSelectorModal from "../../components/ui/ItemSelectorModal";
import { useProduct } from "../../hooks/useProduct";
import type { Product } from "../../types/product.type";
import ProductsTableControls from "../../components/products/ProductsTableControls";
import ItemsToSponsor from "../../components/sponsored-item/SponsoredItems";

const getColumns = (setSelectedProduct : React.Dispatch<SetStateAction<Product | null>>) : ColumnDef<Product>[] => [
    {
        header: "Product",
        accessorKey: "product_name",
        cell: ({ row }) => (
            <div className="min-w-50 flex items-center gap-3 justify-start">
                <img className="w-10 h-10 rounded-md object-cover" src={row.original.thumbnail_url} />
                <span className="text-xs xl:text-sm">{row.original.product_name}</span>
            </div>
        ),
        meta: { align: 'left' },
    },
    {
        header: "Category",
        accessorKey: "category",
        cell: info => <span className="text-xs xl:text-sm">{info.getValue() as string}</span>,
        meta: { align: 'center' },
    },
    {
        header: "Variants",
        cell: ({ row }) => row.original.variants?.length || 0,
        meta: { align: 'center' },
    },
    {
        header: "Stock",
        cell: ({ row }) => {
            const total = row.original.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
            return <span className="text-xs xl:text-sm">{total}</span>;
        },
        meta: { align: 'center' },
    },
    {
        header: "Created At",
        cell: ({ row }) => formatDate(row.original.createdAt),
        meta: { align: 'center' },
    },
    {
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-center">
                <GoldButton
                    onClick={() => setSelectedProduct(row.original)}
                >Select</GoldButton>
            </div>
        ),
        meta: { align: 'center' },
    }
];


export default function AddSponsoredItems () {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    const debouncedSearch = useDebounce(search, 500);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    const params = useMemo(() => ({ 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        category: category === 'All' ? "" : category,
        sortBy: sorting.sortBy,
        order: sorting.order
    }), [pagination, debouncedSearch, sorting, category])

    const { getProducts } = useProduct();
    const { data, isFetching } = getProducts(params);

    const columns = getColumns(setSelectedProduct);

    const [variants, setVariants] = useState<{ variant: Variant, product_name: string, quantity: number }[]>([]);

    const addVariant = (newVariant: Variant, quantity: number, product_name: string) => {
        const existing = variants.find(v => v.variant._id === newVariant._id);

        if (existing) {
            // Check if adding exceeds stock
            if ((existing.quantity + quantity) > existing.variant.stock) {
                errorToast("Error", "Quantity exceeds available stock");
                return;
            }

            // Update existing variant quantity
            setVariants(prev => 
                prev.map(v => v.variant._id === newVariant._id ? { ...v, quantity: v.quantity + quantity } : v)
            );
        } else {
            // Check if quantity exceeds stock for new variant
            if (quantity > newVariant.stock) {
                errorToast("Error", "Quantity exceeds available stock");
                return;
            }

            // Add new variant
            setVariants(prev => [...prev, { variant: newVariant, quantity, product_name }]);
        }

        successToast("Success", `${newVariant.variant_name} successfully added`);
    };

    return (
        <PageContainer
            title="Add Sponsored Products"
            className="md:max-h-screen" 
            description="Select products you want to sponsored"
        >
            <ItemsToSponsor 
                close={() => setShowModal(false)}
                open={showModal}
                setVariants={setVariants}
                variants={variants}
            />
            <div className="flex justify-end">
                <GoldButton 
                    className="text-sm relative" 
                    onClick={() => setShowModal(true)}
                >
                    Products to Sponsor
                    {variants.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {variants.length}
                    </span>}
                </GoldButton>
            </div>
            <ItemSelectorModal 
                addVariant={addVariant}
                close={() => setSelectedProduct(null)}
                selectedProduct={selectedProduct}
            />
            <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-5">
                <ProductsTableControls 
                    category={category}
                    setCategory={setCategory}
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    setPagination={setPagination}
                />
                <CustomizedTable
                    isLoading={isFetching}
                    data={data?.products || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Variants Found"
                    total={data?.total || 0}
                    className="max-h-[70vh]"
                />
            </Card>
        </PageContainer>
    )
}