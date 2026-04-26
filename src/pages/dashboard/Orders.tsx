import { useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/ui/PageContainer";
import { useOrder } from "../../hooks/useOrder";
import { useDebounce } from "../../hooks/useDebounce";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import type { Order } from "../../types/order.type";
import Card from "../../components/ui/Card";
import CustomizedTable from "../../components/ui/Table";
import { formatToPeso } from "../../utils/utils";
import Chip from "../../components/ui/Chip";
import OrderStatusChip from "../../components/orders/OrderStatusChip";
import IconButton from "../../components/ui/IconButton";
import { Eye } from "lucide-react";
import OrderControls from "../../components/orders/OrderControls";
import { useSearchParams } from "react-router-dom";
import OrderDetailsModal from "../../components/orders/OrdersModal";

export default function Orders () {
    const [searchParams, setSearchParams] = useSearchParams();

    const order_id = searchParams.get("order_id");

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    
    const [search, setSearch] = useState(order_id || "");
    const debouncedSearch = useDebounce(search, 500);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [deliveryType, setDeliveryType] = useState("");
    const [status, setStatus] = useState("");

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const params = useMemo(() => ({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: debouncedSearch,
        startDate,
        endDate,
        paymentMethod,
        paymentStatus,
        status,
        deliveryType
    }), [
        pagination,
        debouncedSearch,
        startDate,
        endDate,
        paymentMethod,
        paymentStatus,
        status,
        deliveryType
    ]);


const getColumns = (
    setSelectedOrder: (order: Order) => void,
    setIsModalOpen: (open: boolean) => void
) : ColumnDef<Order>[] => [
    {
        header: "Order ID",
        accessorKey: 'order_id'
    },
    {
        header: "Customer",
        accessorKey: "customer_name",
    },
    {
        header: 'Delivery Type',
        accessorKey: 'delivery_type',
        cell: info => <span className="capitalize">For {info.getValue() as string}</span>,
        meta: { align: 'center' },
    },
    {
        header: 'Payment Method',
        accessorKey: 'payment_method',
        cell: info => info.getValue() || 'N/A',
        meta: { align: 'center' },
    },
    {
        header: 'Payment Status',
        accessorKey: 'payment_status',
        cell: info => <Chip className="capitalize">{info.getValue() as string}</Chip>,
        meta: { align: 'center' },
    },
    {
        header: 'Delivery Status',
        accessorKey: 'status',
        cell: ({ row }) => (
            <div className="flex justify-center">
                <OrderStatusChip status={row.original.status}/>
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: "Total Amount",
        accessorKey: 'total_amount',
        cell: info => formatToPeso(Number(info.getValue())),
        meta: { align: 'center' },
    },
    {
        header: 'Action',
        cell: ({row}) => ( 
            <IconButton 
                icon={<Eye size={20}/>} 
                onClick={() => {
                    setSelectedOrder(row.original);
                    setIsModalOpen(true);
                }}
            />
        ),
        meta: { align: 'center' },
    }
    
]

    const { getOrders } = useOrder();
    const { data, isFetching } = getOrders(params);

    const columns = useMemo(
        () =>
           getColumns(
              setSelectedOrder,
              setIsModalOpen
           ),
        []
     );

    useEffect(() => {
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

        const isReload = navEntry?.type === "reload";

        if (isReload && order_id) {
            setSearchParams({}, { replace: true });
        }
    }, [order_id]);

    return (
        <PageContainer
            title="Orders"
            description="View and manage customer orders, track order status, and review transaction details."
        >
            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-5">
                <OrderControls 
                    startDate={startDate}
                    endDate={endDate}
                    search={search}
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    status={status}
                    setStatus={setStatus}
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    deliveryType={deliveryType}
                    setDeliveryType={setDeliveryType}
                    setPagination={setPagination}
                />
                <CustomizedTable 
                    data={data?.orders || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    isLoading={isFetching}
                    noDataMessage="No Orders Found"
                    total={data?.total || 0}
                />
                <OrderDetailsModal
                    order={selectedOrder}
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedOrder(null);
                     }}
                />
            </Card>
        </PageContainer>
    )
}