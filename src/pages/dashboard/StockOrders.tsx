import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import { useDebounce } from "../../hooks/useDebounce";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useStockOrder } from "../../hooks/useStockOrder";
import IconButton from "../../components/ui/IconButton";
import { Eye } from "lucide-react";
import type { StockOrder } from "../../types/stock-order.type";
import CustomizedTable from "../../components/ui/Table";
import DeliveryStatusChip from "../../components/ui/DeliveryStatusChip";
import { formatDate } from "../../utils/utils";
import StockOrderControls from "../../components/stockOrder/StockOrderControls";
import { useSearchParams } from "react-router-dom";

const getColumns = () : ColumnDef<StockOrder>[] => [
    {
        header: "Stock Order ID",
        accessorKey: 'stock_order_id'
    },
    {
        header: "Distributor",
        cell: ({ row }) => (
            <div>
                <h1>{row.original.distributor.distributor_name}</h1>
                <p className="text-gray">{row.original.distributor.email}</p>
            </div>
        ) 
    },
    {
        header: "Distributor ID",
        accessorKey: "distributor.distributor_id",
        meta: { align: 'center' },
    },
    {
        header: 'Status',
        accessorKey: "status",
        cell: info => (
            <div className="flex justify-center">
                <DeliveryStatusChip status={info.getValue() as string} />
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: info => formatDate(info.getValue() as string),
        meta: { align: 'center' },
    },
    {
        header: 'Action',
        cell: () => <IconButton icon={<Eye size={20}/>} onClick={() => console.log()}/>,
        meta: { align: 'center' },
    },
    
]

export default function StockOrders () {
    const [searchParams, setSearchParams] = useSearchParams();

    const stock_order_id = searchParams.get("stock_order_id");
    
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });

    const [search, setSearch] = useState(stock_order_id || "");
    const debouncedSearch = useDebounce(search, 800);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [status, setStatus] = useState("");

    const params = useMemo(() => ({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: debouncedSearch,
        startDate,
        endDate,
        status,
    }), [
        pagination,
        debouncedSearch,
        startDate,
        endDate,
        status,
    ])

    const { getStockOrders } = useStockOrder();
    const { data, isFetching } = getStockOrders(params);

    const columns = getColumns();

    useEffect(() => {
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

        const isReload = navEntry?.type === "reload";

        if (isReload && stock_order_id) {
            setSearchParams({}, { replace: true });
        }
    }, [stock_order_id]);

    return (
        <PageContainer
            title="Stock Orders"
            description="View and manage all stock orders and their current status"
        >
            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-5">
                <StockOrderControls 
                    startDate={startDate}
                    endDate={endDate}
                    search={search}
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    status={status}
                    setStatus={setStatus}
                    setPagination={setPagination}

                />
                <CustomizedTable 
                    data={data?.stockOrders || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    isLoading={isFetching}
                    noDataMessage="No Stock Orders Found"
                    total={data?.total || 0}
                />
            </Card>
        </PageContainer>
    )
}