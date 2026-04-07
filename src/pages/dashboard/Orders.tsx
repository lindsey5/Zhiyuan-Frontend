import { useState, useMemo } from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { useOrders } from "../../hooks/useOrders";
import CustomizedTable from "../../components/ui/Table";
import OrdersFilter from "../../components/ui/orders/OrdersControls";
import { Eye, CreditCard } from "lucide-react";
import Button from "../../components/ui/Button";

// 👉 define Order type (adjust if needed)
type Order = {
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
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, isFetching } = useOrders({
    search,
    page,
    ...filters,
  });

  const handleView = (order: Order) => {
    console.log("View", order);
  };

  const handleMarkPaid = (order: Order) => {
    console.log("Mark Paid", order);
  };

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
      handleView,
      handleMarkpaid
    ]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Orders</h1>

      <OrdersFilter 
        onSearch={setSearch}
        onFilter={(f: OrderFilters) => setFilters((prev) => ({ ...prev, ...f }))}
      />

      <CustomizedTable 
        data={data || []}                
        columns={columns}                
        isLoading={isFetching}           
        showPagination={true}
        noDataMessage="No orders found"                       
      />
    </div>
  );
}