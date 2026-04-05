import { useState } from "react";
import Card from "../../components/ui/Card";
import { useProduct } from "../../hooks/useProduct"
import { useDebounce } from "../../hooks/useDebounce";
import {
  type ColumnDef,
  type PaginationState,
  type Row,
} from "@tanstack/react-table";
import type { Product } from "../../types/product.type";
import CustomizedTable from "../../components/ui/Table";
import { formatDate } from "../../utils/utils";
import type { SortOption } from "../../types/type";
import ProductsTableControls from "../../components/products/ProductsTableControls";
import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { promiseToast } from "../../utils/sileo";

export default function Products () {
    const navigate = useNavigate();

    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole();
    const permissions =  role?.permissions || [];
    const { hasPermissions, hasAnyPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    
    const { getProducts, deleteProduct } = useProduct();
    
    const params = { 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    }

    const { data, isFetching } = getProducts(params);

    const deleteExistingProduct = (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return;

        promiseToast(deleteProduct.mutateAsync({ 
            id, 
        }), "top-center", "Product succesfully deleted.")
    };

    const columns: ColumnDef<Product>[] = [
        {
            header: "Product",
            accessorKey: "product_name",
            cell: ({ row }) => (
                <div className="lg:min-w-50 flex flex-wrap md:flex-nowrap items-center gap-3 justify-start">
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
        ...(hasAnyPermissions([ PERMISSIONS.PRODUCT_UPDATE, PERMISSIONS.PRODUCT_DELETE], permissions)
            ? [
                {
                    header: "Action",
                    cell: ({ row }: { row: Row<Product> }) => (
                        <div className="flex flex-col lg:flex-row gap-3 justify-center">
                            {hasPermissions([PERMISSIONS.PRODUCT_UPDATE], permissions) && (
                                <Button
                                    label="Edit"
                                    className="p-1 lg:p-3 text-xs xl:text-sm"
                                    disabled={deleteProduct.isPending}
                                    onClick={() => navigate(`/dashboard/edit-product/${row.original._id}`)}
                                />
                            )}
    
                            {hasPermissions([PERMISSIONS.PRODUCT_DELETE], permissions) && (
                                <Button
                                    label="Delete"
                                    className="bg-red-600 text-white p-1 lg:p-3 text-xs xl:text-sm"
                                    disabled={deleteProduct.isPending}
                                    onClick={() => deleteExistingProduct(row.original._id)}
                                />
                            )}
                        </div>
                    ),
                    meta: { align: 'center' },
                },
            ]
        : []),
    ];

    return (
        <PageContainer 
            className="md:max-h-screen" 
            title="Products"
            description="View and manage all products"
        >
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5 pt-5">
                <ProductsTableControls 
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                />
                <CustomizedTable 
                    data={data?.products || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    isLoading={isFetching}
                    noDataMessage="No Products Found"
                    total={data?.total || 0}
                />
            </Card>
        </PageContainer>
    )
}