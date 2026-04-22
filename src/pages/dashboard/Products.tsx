import { useMemo, useState } from "react";
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
import type { ApiResponse, CreateColumnsParams, SortOption } from "../../types/type";
import ProductsTableControls from "../../components/products/ProductsTableControls";
import PageContainer from "../../components/ui/PageContainer";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { promiseToast } from "../../utils/sileo";
import type { UseMutationResult } from "@tanstack/react-query";
import { variantService } from "../../service/variantService";
import { Download } from "lucide-react";

interface ProductColsParams extends CreateColumnsParams {
    deleteProduct: UseMutationResult<ApiResponse, Error, {id: string;}, unknown>;
    deleteExistingProduct: (id: string) => void;
    navigate: NavigateFunction;
}

const getColumns = ({ 
    deleteExistingProduct, 
    deleteProduct, 
    hasAnyPermissions, 
    hasPermissions, 
    navigate
} : ProductColsParams) : ColumnDef<Product>[] => [
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
    ...(hasAnyPermissions([ PERMISSIONS.PRODUCT_UPDATE, PERMISSIONS.PRODUCT_DELETE])
        ? [
            {
                header: "Action",
                cell: ({ row }: { row: Row<Product> }) => (
                    <div className="flex flex-col lg:flex-row gap-3 justify-center">
                        {hasPermissions([PERMISSIONS.PRODUCT_UPDATE]) && (
                            <Button
                                label="Edit"
                                className="p-1 lg:p-3 text-xs xl:text-sm"
                                disabled={deleteProduct.isPending}
                                onClick={() => navigate(`/dashboard/edit-product/${row.original._id}`)}
                            />
                        )}

                        {hasPermissions([PERMISSIONS.PRODUCT_DELETE]) && (
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

export default function Products () {
    const navigate = useNavigate();
    const { hasPermissions, hasAnyPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    
    const { getProducts, deleteProduct } = useProduct();
    
    const params = useMemo(() => ({
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    }), [pagination.pageIndex, pagination.pageSize, debouncedSearch, sorting, category]);

    const debouncedParams = useDebounce(params, 800);
    const { data, isFetching } = getProducts(debouncedParams);

    const deleteExistingProduct = (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return;

        promiseToast(deleteProduct.mutateAsync({ 
            id, 
        }), "top-center")
    };

    const columns = getColumns({
        deleteExistingProduct,
        deleteProduct,
        hasAnyPermissions,
        hasPermissions,
        navigate,
    })

    const onRowClick = (row : Product) => {
        if(hasPermissions([PERMISSIONS.PRODUCT_DELETE])) navigate(`/dashboard/edit-product/${row._id}`);
    }

    const downloadVariants = async () => {
        await variantService.downloadVariants({
            category: category === 'All' ? undefined : category,
            search
        })
    }

    return (
        <PageContainer 
            title="Products"
            description="View and manage all products"
        >
            <div className="flex justify-end px-5">
                <Button 
                    label="Export"
                    icon={<Download size={20} />}
                    onClick={downloadVariants}
                />
            </div>
            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-5">
                <ProductsTableControls 
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                    setPagination={setPagination}
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
                    onRowClick={onRowClick}
                />
            </Card>
        </PageContainer>
    )
}