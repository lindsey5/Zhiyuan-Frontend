import { useState } from "react";
import Card from "../../components/ui/Card";
import { useProduct } from "../../hooks/useProduct"
import { useDebounce } from "../../hooks/useDebounce";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type PaginationState,
  type Row,
} from "@tanstack/react-table";
import type { Product } from "../../types/product";
import CustomizedTable, { TableSkeleton } from "../../components/ui/Table";
import { formatDate } from "../../utils/utils";
import type { SortOption } from "../../types/type";
import ProductsTableControls from "../../components/products/ProductsTableControls";
import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";
import { promiseToast } from "../../utils/sileo";

export default function Products () {
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();

    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole();
    const permissions =  role?.permissions || [];
    const { hasPermissions, hasAnyPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "DESC" });
    
    const { getProducts, deleteProduct } = useProduct();
    const { data, isLoading } = getProducts({ 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    });

    const deleteExistingProduct = (id: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return;

        promiseToast(deleteProduct.mutateAsync({ id, accessToken: accessToken || "" }), "top-center", "Product succesfully deleted.")
    };

    const columns: ColumnDef<Product>[] = [
        {
            header: "Product",
            accessorKey: "product_name",
            cell: ({ row }) => (
                <div className="flex items-center gap-3 justify-start">
                    <img className="w-10 h-10 rounded-md object-cover" src={row.original.thumbnail_url} />
                    <span className="text-sm">{row.original.product_name}</span>
                </div>
            ),
            meta: { align: 'left' },
        },
        {
            header: "Category",
            accessorKey: "category",
            
            cell: info => <span className="text-sm">{info.getValue() as string}</span>,
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
                return <span className="text-sm">{total}</span>;
            },
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
                    cell: ({ row }: { row: Row<Product> }) => (
                        <div className="flex gap-3 text-sm justify-center">
                            {hasPermissions([PERMISSIONS.PRODUCT_UPDATE], permissions) && (
                                <Button
                                    label="Edit"
                                    onClick={() => navigate(`/dashboard/edit-product/${row.original.id}`)}
                                />
                            )}
    
                            {hasPermissions([PERMISSIONS.PRODUCT_DELETE], permissions) && (
                                <Button
                                    label="Delete"
                                    className="bg-red-600 text-white"
                                    onClick={() => deleteExistingProduct(row.original.id)}
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
        data: data?.products ?? [],
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
            title="Products"
            description="View and manage all products"
        >
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5 pt-10">
                <ProductsTableControls 
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                />
                {isLoading ? <TableSkeleton columns={columns.length} /> : (
                    <CustomizedTable 
                        table={table}
                        showPagination
                        noDataMessage="No Products Found"
                    />
                )}
            </Card>
        </PageContainer>
    )
}