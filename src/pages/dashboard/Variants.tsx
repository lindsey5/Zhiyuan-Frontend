import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import { useDebounce } from "../../hooks/useDebounce";
import {
  type ColumnDef,
  type PaginationState,
  type Row,
} from "@tanstack/react-table";
import CustomizedTable from "../../components/ui/Table";
import { formatDate, formatToPeso } from "../../utils/utils";
import type { ApiResponse, SortOption } from "../../types/type";
import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import { useVariant } from "../../hooks/useVariant";
import type { Variant, VariantWithProduct } from "../../types/variant.type";
import VariantsTableControls from "../../components/variants/VariantsTableControls";
import { promiseToast } from "../../utils/sileo";
import EditVariant from "../../components/variants/EditVariant";
import { useNavigate } from "react-router-dom";
import type { UseMutationResult } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { variantService } from "../../service/variantService";

interface VariantColsParams {
    hasPermissions: (requiredPermissions: string[], permissions: string[]) => boolean;
    permissions: string[];
    deleteVariant: UseMutationResult<ApiResponse, Error, { id: string }, unknown>;
    handleDelete: (id: string) => void;
    handleEdit: (variant : Variant) => void;
}

const getColumns = ({
    hasPermissions,
    permissions,
    deleteVariant,
    handleDelete,
    handleEdit
} : VariantColsParams) : ColumnDef<VariantWithProduct>[] => [
    {
        header: "Variant",
        cell: ({ row }) => (
            <div className="min-w-50 flex items-center gap-3 justify-start">
                <img className="w-10 h-10 rounded-md object-cover" src={row.original.image_url} />
                <span className="text-xs xl:text-sm">{row.original.variant_name}</span>
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
        cell: info => (
            <div className="md:min-w-50">
                {info.getValue() as string}
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: "Category",
        accessorKey: "product.category",
        
        cell: info => <span className="text-xs xl:text-sm">{info.getValue() as string}</span>,
        meta: { align: 'center' },
    },
    {
        header: "Stock",
        accessorKey: "stock",
        meta: { align: 'center' },
    },
    {
        header: "Price",
        accessorKey: "price",
        cell: info => formatToPeso(info.getValue() as number),
        meta: { align: 'center' },
    },
    {
        header: "Created At",
        accessorKey: 'createdAt',
        cell: info => formatDate(info.getValue() as string),
        meta: { align: 'center' },
    },
    ...(hasPermissions([PERMISSIONS.PRODUCT_UPDATE], permissions)
        ? [
            {
                header: "Action",
                cell: ({ row } : { row: Row<VariantWithProduct>}) => (
                    <div className="flex flex-col lg:flex-row gap-3 justify-center">
                        <Button
                            label="Edit"
                            disabled={deleteVariant.isPending}
                            className="p-1 lg:p-3 text-xs xl:text-sm"
                            onClick={() => {
                                handleEdit(row.original);
                            }}
                        />

                        <Button
                            label="Delete"
                            disabled={deleteVariant.isPending}
                            className="bg-red-600 text-white p-1 lg:p-3 text-xs xl:text-sm"
                            onClick={() => handleDelete(row.original._id)}
                        />
                    </div>
                ),
                meta: { align: 'center' },
            },
        ]
    : []),
];

export default function Variants () {
    const navigate = useNavigate();
    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole();
    const permissions =  role?.permissions || [];
    const { hasPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    const [showModal, setShowModal] = useState(false);
    const [variant, setVariant] = useState<Variant | null>(null);

    const params = useMemo(() => ({
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    }), [pagination.pageIndex, pagination.pageSize, debouncedSearch, sorting, category]);

    const debouncedParams = useDebounce(params, 800);
    const { getVariants, deleteVariant } = useVariant();
    const { data, isFetching } = getVariants(debouncedParams);

    const handleDelete = (id: string) => {
        const isConfirmed = confirm('Are you sure you want to delete this variant?');

        if(!isConfirmed) return;

        promiseToast(deleteVariant.mutateAsync({ id }))
    }

    const handleEdit = (variant : Variant) => {
        setShowModal(true);
        setVariant(variant);
    }

    const closeModal = () => {
        setShowModal(false);
        setVariant(null);
    }

    const columns = getColumns({
        deleteVariant,
        handleDelete,
        handleEdit,
        hasPermissions,
        permissions
    })

    const downloadVariants = async () => {
        await variantService.downloadVariants({
            category: category === 'All' ? undefined : category,
            search
        })
    }

    return (
        <PageContainer 
            className="md:max-h-screen" 
            title="Variants"
            description="View and manage all product variants"
        >
            <div className="flex justify-end px-5">
                <Button 
                    label="Export"
                    icon={<Download size={20} />}
                    onClick={downloadVariants}
                />
            </div>
            <EditVariant 
                open={showModal}
                close={closeModal}
                variant={variant}
            />

            <Card className="p-0 flex flex-col min-h-0 flex-grow space-y-5 pt-5">
                <VariantsTableControls
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                />
                <CustomizedTable 
                    data={data?.variants || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    isLoading={isFetching}
                    showPagination
                    noDataMessage="No Variants Found"
                    total={data?.total || 0}
                />
            </Card>
            {hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_TRANSFER], permissions) && (
                <div className="flex justify-end">
                    <Button 
                        label="Transfer Stocks"
                        onClick={() => navigate('/dashboard/distributors/transfer-stocks')}
                    />
                </div>
            )}
        </PageContainer>
    )
}