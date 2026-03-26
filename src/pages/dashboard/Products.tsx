import { useState } from "react";
import Card from "../../components/ui/Card";
import { useProduct } from "../../hooks/useProduct"
import { useDebounce } from "../../hooks/useDebounce";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import type { Product } from "../../types/product";
import CustomizedTable from "../../components/ui/Table";
import { formatDate } from "../../utils/utils";
import type { SortOption } from "../../types/type";
import ProductsTableControls from "../../components/products/ProductsTableControls";
import PageContainer from "../../components/ui/PageContainer";

export default function Products () {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "DESC" });
    const { getProducts } = useProduct();
    const { data } = getProducts({ 
        page: 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    });

    const columns: ColumnDef<Product>[] = [
        {
            header: "Product",
            accessorKey: "product_name",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-md object-cover" src={row.original.thumbnail_url} />
                    <span className="text-sm">{row.original.product_name}</span>
                </div>
            )
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: info => <span className="text-sm">{info.getValue() as string}</span>
        },
        {
            header: "Variants",
            cell: ({ row }) => row.original.variants?.length || 0
        },
        {
            header: "Stock",
            cell: ({ row }) => {
                const total = row.original.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
                return <span className="text-sm">{total}</span>;
            },
        },
        {
            header: "Created At",
            cell: ({ row }) => formatDate(row.original.createdAt)
        },
        {
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-3 text-sm">
                    <button>
                        Edit
                    </button>
                    <button>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: data?.products ?? [],
        columns,
        pageCount: Math.ceil((data?.total ?? 0) / pagination.pageSize),
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    return (
        <PageContainer className="h-screen" title="Products">
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5">
                <ProductsTableControls 
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                />
                <CustomizedTable table={table}/>
            </Card>
        </PageContainer>
    )
}