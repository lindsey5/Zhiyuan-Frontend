import { useState, useMemo } from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { useOrders } from "../../hooks/useOrders";
import CustomizedTable, { TableCardSkeleton } from "../../components/ui/Table";
import OrdersFilter from "../../components/ui/orders/OrdersControls";
import { Eye, CreditCard } from "lucide-react";
import Button from "../../components/ui/Button";

// 👉 define Order type (adjust if needed)
type Order = {
  id: string;
  customerName: string;
  deliveryType: string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  totalAmount: number;
  orderDate: string;
};

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
      accessorKey: "id",
    },
    {
      header: "Customer",
      accessorKey: "customerName",
    },
    {
      header: "Delivery Type",
      accessorKey: "deliveryType",
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
    },
    {
      header: "Payment Status",
      cell: ({ row }) => (
        <span className="text-yellow-300">
          {row.original.paymentStatus}
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
        }).format(row.original.totalAmount),
      meta: { align: "right" },
    },
    {
      header: "Order Date",
      cell: ({ row }) =>
        new Date(row.original.orderDate).toLocaleDateString(),
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

            {order.paymentStatus === "unpaid" && (
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
  ], []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Orders</h1>

      <OrdersFilter 
        onSearch={setSearch}
        onFilter={(f: any) => setFilters((prev) => ({ ...prev, ...f }))}
      />

      <CustomizedTable 
        data={data || []}                
        columns={columns}                
        isLoading={isFetching}           
        showPagination={true}
        noDataMessage="No orders found"
        total={0}                        
      />
    </div>
  );
}