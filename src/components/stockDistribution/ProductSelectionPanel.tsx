import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import Card from "../ui/Card";
import { type Variant } from "../../types/variant.type";
import { formatDate } from "../../utils/utils";
import { useMemo, useState, type SetStateAction } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import CustomizedTable from "../ui/Table";
import type { SortOption } from "../../types/type";
import type { Product } from "../../types/product.type";
import { useProduct } from "../../hooks/useProduct";
import ProductsTableControls from "../products/ProductsTableControls";
import GoldButton from "../ui/GoldButton";
import ItemSelectorModal from "../ui/ItemSelectorModal";

interface ProductSelectionPanelProps {
    addVariant: (variant: Variant, quantity: number, product_name: string) => void;
}

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
            <GoldButton
                onClick={() => setSelectedProduct(row.original)}
            >Select</GoldButton>
        ),
        meta: { align: 'center' },
    }
];

export default function ProductSelectionPanel ({ addVariant } : ProductSelectionPanelProps) {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    const debouncedSearch = useDebounce(search, 500);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

    return (
        <Card className="p-0 flex flex-col">
            <h1 className="p-5 text-md xl:text-lg font-bold">Select Items to Transfer</h1>
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
            <ItemSelectorModal 
                addVariant={addVariant}
                close={() => setSelectedProduct(null)}
                selectedProduct={selectedProduct}
            />
        </Card>
    )
}