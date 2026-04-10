import { useState, useMemo, useCallback } from "react";
import { type ColumnDef, type PaginationState, type Row } from "@tanstack/react-table";
import { useOrders } from "../../hooks/useOrders";
import CustomizedTable from "../../components/ui/Table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer"
import OrdersFilter from "../../components/ui/orders/OrdersControls";
import { Eye, CreditCard } from "lucide-react";
import Button from "../../components/ui/Button";
import { useDebounce } from "../../hooks/useDebounce"

export type Order = {
  order_id: string;
  customer_name: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total_amount: number;
  delivery_type: "pickup" | "delivery";
  payment_method: "COD" | "GCash" | "Card";
  payment_status: "paid" | "unpaid";
  createdAt: string;
};

type OrderFilters = {
  status?: string;
  payment_status?: string;
  delivery_type?: string;
}

export default function Orders() {
  const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [filters, setFilters] = useState({});

  const { data, isFetching } = useOrders({ 
    search: debouncedSearch,
    page: pagination.pageIndex + 1,
    ...filters,
  });

  const handleView = useCallback((order: Order) => {
    console.log("View", order);
  }, []);
  
  const handleMarkPaid = useCallback((order: Order) => {
    console.log("Mark Paid", order);
  }, []);

  const columns: ColumnDef<Order>[] = useMemo(() => [
    {
      header: "Order ID",
      accessorKey: "order_id",
    },
    {
      header: "Customer",
      accessorKey: "customer_name",
    },
    {
      header: "Delivery Type",
      accessorKey: "delivery_type",
    },
    {
      header: "Payment Method",
      accessorKey: "payment_method",
    },
    {
      header: "Payment Status",
      cell: ({ row }) => (
        <span className="text-yellow-300">
          {row.original.payment_status}
        </span>
      ),
      meta: { align: "center" },
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span className="text-blue-300">
          {row.original.status}
        </span>
      ),
      meta: { align: "center" },
    },
    {
      header: "Total Amount",
      cell: ({ row }) =>
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.original.total_amount),
      meta: { align: "right" },
    },
    {
      header: "Order Date",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
      meta: { align: "center" },
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Row<Order> }) => {
        const order = row.original;

        return (
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => handleView(order)}
              className="p-2 text-xs"
            >
              <Eye size={16} />
            </Button>

            {order.payment_status === "unpaid" && (
              <Button
                onClick={() => handleMarkPaid(order)}
                className="bg-yellow-600 text-white p-2 text-xs"
              >
                <CreditCard size={16} />
              </Button>
            )}
          </div>
        );
      },
      meta: { align: "center" },
    },
  ], [
    handleMarkPaid,
    handleView,
  ]);

  return (
    <PageContainer 
      className="md:max-h-screen" 
      title="Orders"
      description="Manage all customer orders"
    >
      <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-5"> 
        <OrdersFilter 
          onSearch={setSearch}
          onFilter={(f: OrderFilters) => setFilters((prev) => ({ ...prev, ...f }))} 
        />

        <CustomizedTable 
            data={data?.orders || []}
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
  );
}