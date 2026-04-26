import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import type { SortOption } from "../../types/type";
import { useSponsoredItem } from "../../hooks/useSponsoredItem";
import type { SponsoredItem } from "../../types/sponsored-item.type";
import { formatDate } from "../../utils/utils";
import CustomizedTable from "../../components/ui/Table";
import Chip from "../../components/ui/Chip";
import SponsoredItemControls from "../../components/sponsored-item/SponsoredItemControls";
import DeliveryStatusChip from "../../components/ui/DeliveryStatusChip";
import { useSearchParams } from "react-router-dom";

const getColumns = () : ColumnDef<SponsoredItem>[] => [
    {
        header: "Sponsored ID",
        accessorKey: 'sponsored_id',
        meta: { align: 'center' }
    },
    {
        header: "Product",
        accessorKey: "product_name",
        cell: ({ row }) => (
            <div className="min-w-50 flex items-center gap-3 justify-center">
                <img className="w-10 h-10 rounded-md object-cover" src={row.original.variant.image_url} />
                <span className="text-xs xl:text-sm">{row.original.variant.product.product_name}</span>
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: "Variant",
        cell: ({ row }) => (
            <div className="min-w-50">
                <Chip>{row.original.variant.variant_name}</Chip>
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: "SKU",
        accessorKey: 'variant.sku',
        meta: { align: 'center' }
    },
    {
        header: "Requested By",
        cell: ({ row }) => (
            <div>
                <h1>{row.original.distributor.distributor_name}</h1>
                <p>{row.original.distributor.email}</p>
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
        header: "Status",
        accessorKey: "status",
        cell: info => (
            <div className="flex justify-center">
                <DeliveryStatusChip status={info.getValue() as string}/>
            </div>
        ),
        meta: { align: 'center' }
    },
    {
        header: "Date",
        cell: ({ row }) => (
            <div className="min-w-30">
                {formatDate(row.original.createdAt)}
            </div>
        ),
        meta: { align: 'center' },
    },
];

export default function SponsoredItems () {
    const [searchParams, setSearchParams] = useSearchParams();
    const sponsored_id = searchParams.get("sponsored_id");

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState(sponsored_id || "");
    const debouncedSearch = useDebounce(search, 800);
    const [sorting, setSorting] = useState<SortOption>({ sortBy: "createdAt", order: "desc" });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { getSponsoredItems } = useSponsoredItem();
    
    const params = useMemo(() => ({
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
        sortBy: sorting.sortBy,
        order: sorting.order,
        startDate: startDate ? formatDate(startDate) : "",
        endDate: endDate ? formatDate(endDate) : "",
    }), [pagination.pageIndex, pagination.pageSize, debouncedSearch, sorting]);

    const debouncedParams = useDebounce(params, 800);
    const { data, isFetching } = getSponsoredItems(debouncedParams);

    const columns = getColumns();
    
    useEffect(() => {
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

        const isReload = navEntry?.type === "reload";

        if (isReload && sponsored_id) {
            setSearchParams({}, { replace: true });
        }
    }, [sponsored_id]);

    return (
        <PageContainer
            title="Sponsored Products"
            description="View and manage sponsored products"
        >
            <Card className="flex flex-col max-h-screen space-y-5 p-0 pt-5">
                <SponsoredItemControls 
                    search={search}
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