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
import type { SortOption } from "../../types/type";
import PageContainer from "../../components/ui/PageContainer";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import type { Variant, VariantWithProduct } from "../../types/variant.type";
import VariantsTableControls from "../../components/variants/VariantsTableControls";
import EditVariant from "../../components/variants/EditVariant";
import { useProduct } from "../../hooks/useProduct";

interface VariantColsParams {
    hasPermissions: (requiredPermissions: string[]) => boolean;
    handleEdit: (variant : Variant) => void;
}

const getColumns = ({
    hasPermissions,
    handleEdit
} : VariantColsParams) : ColumnDef<VariantWithProduct>[] => [
    {
        header: "Variant",
        cell: ({ row }) => (
            <div className="min-w-60 flex items-center gap-3 justify-start">
                <img className="w-10 h-10 rounded-md object-cover" src={row.original.image_url} />
                <div className="space-y-2 flex flex-col items-start">
                    <p className="text-xs">{row.original.product.product_name}</p>
                    <p className="text-center text-xs bg-gold px-3 py-1 text-inverse rounded-pull rounded-full">{row.original.variant_name}</p>
                </div>
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
        header: "Category",
        accessorKey: "product.category",
        
        cell: info => <span className="text-xs">{info.getValue() as string}</span>,
        meta: { align: 'center' },
    },
    {
        header: "Stock",
        accessorKey: "stock",
        cell: info => <span className="text-red-600 font-bold">{info.getValue() as string}</span>,
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
    ...(hasPermissions([PERMISSIONS.PRODUCT_UPDATE])
        ? [
            {
                header: "Action",
                cell: ({ row } : { row: Row<VariantWithProduct>}) => (
                    <div className="flex flex-col lg:flex-row gap-3 justify-center">
                        <Button
                            label="Edit"
                            className="p-1 lg:p-3 text-xs"
                            onClick={() => {
                                handleEdit(row.original);
                            }}
                        />
                    </div>
                ),
                meta: { align: 'center' },
            },
        ]
    : []),
];

export default function LowStockProducts () {
    const { hasPermissions } = usePermissions();

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('All');
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "stock", order: "asc" });
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
    const { getLowStockProducts } = useProduct();
    const { data, isFetching } = getLowStockProducts(debouncedParams);

    const handleEdit = (variant : Variant) => {
        setShowModal(true);
        setVariant(variant);
    }

    const closeModal = () => {
        setShowModal(false);
        setVariant(null);
    }

    const columns = getColumns({
        handleEdit,
        hasPermissions,
    })

    const onRowClick = (row : Variant) => {
        if(hasPermissions([PERMISSIONS.PRODUCT_UPDATE])) handleEdit(row);
    }

    return (
        <PageContainer 
            title="Low Stock Products"
            description="View and manage all low stock products"
        >
            <EditVariant 
                open={showModal}
                close={closeModal}
                variant={variant}
            />

            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-5">
                <VariantsTableControls
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    category={category}
                    setCategory={setCategory}
                    setPagination={setPagination}
                />
                <CustomizedTable 
                    data={data?.variants || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    isLoading={isFetching}
                    showPagination
                    noDataMessage="No Products Found"
                    total={data?.total || 0}
                    onRowClick={onRowClick}
                />
            </Card>
        </PageContainer>
    )
}