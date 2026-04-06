import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useOrders } from "../../hooks/useOrders";
import CustomizedTable, { TableSkeleton } from "../../components/ui/Table";
import OrdersFilter from "../../components/orders/OrdersFilters";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useOrders({
    search,
    page,
    ...filters,
  });

  const handleView = (order: any) => {};
  const handleMarkPaid = (order: any) => {};

  const columns = useMemo(
    () => orderColumns(handleView, handleMarkPaid),
    []
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableSkeleton columns={9} />;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Orders</h1>

      <OrdersFilter 
        onSearch={setSearch}
        onFilter={(f: any) => setFilters((prev) => ({ ...prev, ...f }))}
      />

      <CustomizedTable 
        table={table}
        showPagination={true}
        noDataMessage="No orders found"
      />
    </div>
  );
}