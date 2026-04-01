import { useState } from "react";
import Card from "../../components/ui/Card";
import { useDebounce } from "../../hooks/useDebounce";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import CustomizedTable from "../../components/ui/Table";
import { formatDate } from "../../utils/utils";
import type { SortOption } from "../../types/type";
import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import { useVariant } from "../../hooks/useVariant";
import type { VariantWithProduct } from "../../types/variant";
import VariantsTableControls from "../../components/variants/VariantsTableControls";
import { useAuthStore } from "../../lib/store/authStore";

export default function Variants () {
    const accessToken = useAuthStore().accessToken;
    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole(accessToken || "");
    const permissions =  role?.permissions || [];
    const { hasPermissions, hasAnyPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "DESC" });
    
    const params = { 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    }

    const { getVariants } = useVariant();
    const { data, isFetching } = getVariants(params);

    const columns: ColumnDef<VariantWithProduct>[] = [
        {
            header: "Variant",
            cell: ({ row }) => (
                <div className="m-3 flex items-center gap-3 justify-start">
                    <img className="w-8 h-8 lg:w-10 lg:h-10 rounded-md object-cover" src={row.original.image_url} />
                    <span className="text-xs lg:text-sm">{row.original.variant_name}</span>
                </div>
            ),
            meta: { align: 'left' },
        },
        {
            header: 'SKU',
            accessorKey: 'sku',
            meta: { align: 'center' },
        },
        {
            header: 'Product name',
            accessorKey: 'product.product_name',
            meta: { align: 'center' },
        },
        {
            header: "Category",
            accessorKey: "product.category",
            
            cell: info => <span className="text-xs lg:text-sm">{info.getValue() as string}</span>,
            meta: { align: 'center' },
        },
        {
            header: "Stock",
            accessorKey: "stock",
            meta: { align: 'center' },
        },
        {
            header: "Created At",
            cell: ({ row }) => formatDate(row.original.createdAt),
            meta: { align: 'center' },
        },
        ...(hasAnyPermissions([ PERMISSIONS.PRODUCT_UPDATE, PERMISSIONS.PRODUCT_DELETE], permissions)
            ? [
                {
                    header: "Action",
                    cell: () => (
                        <div className="flex gap-3 text-sm justify-center">
                            {hasPermissions([PERMISSIONS.PRODUCT_UPDATE], permissions) && (
                                <Button
                                    label="Edit"
                                />
                            )}
    
                            {hasPermissions([PERMISSIONS.PRODUCT_DELETE], permissions) && (
                                <Button
                                    label="Delete"
                                    className="bg-red-600 text-white"
                                />
                            )}
                        </div>
                    ),
                    meta: { align: 'center' },
                },
            ]
        : []),
    ];

    const table = useReactTable({
        data: data?.variants ?? [],
        columns,
        pageCount: data?.totalPages || 0,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    return (
        <PageContainer 
            className="h-screen" 
            title="Variants"
            description="View and manage all product variants"
        >
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5 pt-10">
                <VariantsTableControls
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                />
                <CustomizedTable 
                    table={table}
                    isLoading={isFetching}
                    showPagination
                    noDataMessage="No Variants Found"
                />
            </Card>
        </PageContainer>
    )
}