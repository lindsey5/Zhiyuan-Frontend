import { useState } from "react";
import Card from "../../components/ui/Card";
import { useDebounce } from "../../hooks/useDebounce";
import {
  type ColumnDef,
  type PaginationState,
  type Row,
} from "@tanstack/react-table";
import CustomizedTable from "../../components/ui/Table";
import { formatDate, formatToPeso } from "../../utils/utils";
import type { SortOption } from "../../types/type";
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

export default function Variants () {
    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole();
    const permissions =  role?.permissions || [];
    const { hasPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    const [showModal, setShowModal] = useState(false);
    const [variant, setVariant] = useState<Variant | null>(null);

    const params = { 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        category: category === 'All' ? undefined : category,
        order: sorting.order,
    }

    const { getVariants, deleteVariant } = useVariant();
    const { data, isFetching } = getVariants(params);

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

    const columns: ColumnDef<VariantWithProduct>[] = [
        {
            header: "Variant",
            cell: ({ row }) => (
                <div className="lg:min-w-50 lg:m-3 flex flex-wrap md:flex-nowrap items-center gap-3 justify-start">
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

    return (
        <PageContainer 
            className="md:max-h-screen" 
            title="Variants"
            description="View and manage all product variants"
        >
            <EditVariant 
                open={showModal}
                close={closeModal}
                variant={variant}
            />

            <Card className="p-0 flex flex-col flex-1 min-h-0 flex-grow space-y-5 pt-5">
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
        </PageContainer>
    )
}