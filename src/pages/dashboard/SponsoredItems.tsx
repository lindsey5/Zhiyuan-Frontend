import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import type { SortOption } from "../../types/type";
import { useSponsoredItem } from "../../hooks/useSponsoredItem";
import type { SponsoredItem } from "../../types/sponsored-item";
import { formatDate } from "../../utils/utils";
import CustomizedTable from "../../components/ui/Table";
import Chip from "../../components/ui/Chip";
import SponsoredItemControls from "../../components/sponsored-item/SponsoredItemControls";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import GoldButton from "../../components/ui/GoldButton";
import { useNavigate } from "react-router-dom";

const getColumns = () : ColumnDef<SponsoredItem>[] => [
    {
        header: "Product",
        accessorKey: "product_name",
        cell: ({ row }) => (
            <div className="min-w-50 flex items-center gap-3 justify-start">
                <img className="w-10 h-10 rounded-md object-cover" src={row.original.variant.image_url} />
                <span className="text-xs xl:text-sm">{row.original.product.product_name}</span>
            </div>
        ),
        meta: { align: 'left' },
    },
    {
        header: "Variant",
        cell: ({ row }) => (
            <div className="min-w-60">
                <Chip>{row.original.variant.variant_name}</Chip>
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: "Quantity",
        accessorKey: "quantity",
        cell: info => info.getValue(),
        meta: { align: 'center' },
    },
    {
        header: "Created At",
        cell: ({ row }) => formatDate(row.original.createdAt),
        meta: { align: 'center' },
    },
];

export default function SponsoredItems () {
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { hasPermissions } = usePermissions();

    const { getSponsoredItems } = useSponsoredItem();
    
    const params = useMemo(() => ({
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        order: sorting.order,
        startDate,
        endDate,
    }), [pagination.pageIndex, pagination.pageSize, debouncedSearch, sorting]);

    const debouncedParams = useDebounce(params, 800);
    const { data, isFetching } = getSponsoredItems(debouncedParams);

    const columns = getColumns();
    
    return (
        <PageContainer
            title="Sponsored Products"
            description="View sponsored products"
        >
            {hasPermissions([PERMISSIONS.SPONSORED_PRODUCT_CREATE]) && (
                <div className="flex justify-end">
                    <GoldButton
                        className="text-sm"
                        onClick={() => navigate('/dashboard/sponsored-products/add')}
                    >Add Sponsored Products</GoldButton>
                </div>
            )}
            <Card className="flex flex-col max-h-screen space-y-5 p-0 pt-5">
                <SponsoredItemControls 
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setPagination={setPagination}
                />
                <CustomizedTable 
                    data={data?.sponsoredItems || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    isLoading={isFetching}
                    noDataMessage="No Items Found"
                    total={data?.total || 0}
                />
            </Card>
        </PageContainer>
    )
}