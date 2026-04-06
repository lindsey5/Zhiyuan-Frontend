'use client';

import { useMemo } from 'react';
import { type ColumnDef, type Row } from '@tanstack/react-table';
import { Order } from '@/app/orders/data';
import CustomizedTable from '../ui/Table';
import { Eye, CreditCard } from 'lucide-react';
import  Button  from '../ui/Button';

interface OrdersTableProps {
  orders: Order[];
  onViewClick: (order: Order) => void;
  onMarkAsPaidClick: (order: Order) => void;
  isLoading?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'text-yellow-300';
    case 'processing':
      return 'text-blue-300';
    case 'shipped':
      return 'text-purple-300';
    case 'delivered':
      return 'text-green-300';
    case 'cancelled':
      return 'text-red-300';
    default:
      return 'text-gray-300';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'text-green-300';
    case 'unpaid':
      return 'text-red-300';
    case 'pending':
      return 'text-yellow-300';
    default:
      return 'text-gray-300';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function OrdersTable({
  orders,
  onViewClick,
  onMarkAsPaidClick,
  isLoading = false,
}: OrdersTableProps) {

  // ✅ Columns (same concept as Categories)
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
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        return (
          <span className={getPaymentStatusColor(status)}>
            {status}
          </span>
        );
      },
      meta: { align: 'center' },
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span className={getStatusColor(status)}>
            {status}
          </span>
        );
      },
      meta: { align: 'center' },
    },
    {
      header: "Total Amount",
      cell: ({ row }) => formatCurrency(row.original.totalAmount),
      meta: { align: 'right' },
    },
    {
      header: "Order Date",
      cell: ({ row }) => formatDate(row.original.orderDate),
      meta: { align: 'center' },
    },
    {
      header: "Actions",
      cell: ({ row }: { row: Row<Order> }) => {
        const order = row.original;

        return (
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => onViewClick(order)}
              className="p-2 text-xs"
            >
              <Eye className="h-4 w-4" />
            </Button>

            {order.paymentStatus === 'unpaid' && (
              <Button
                onClick={() => onMarkAsPaidClick(order)}
                className="bg-yellow-600 text-white p-2 text-xs"
              >
                <CreditCard className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      },
      meta: { align: 'center' },
    },
  ], [onViewClick, onMarkAsPaidClick]);

  return (
    <CustomizedTable
      data={orders || []}
      columns={columns}
      isLoading={isLoading}
      showPagination={false}
      noDataMessage="No orders found"
    />
  );
}