'use client';

import { Order } from '@/app/orders/data';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Eye, CreditCard } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onViewClick: (order: Order) => void;
  onMarkAsPaidClick: (order: Order) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-900/20 text-yellow-300';
    case 'processing':
      return 'bg-blue-900/20 text-blue-300';
    case 'shipped':
      return 'bg-purple-900/20 text-purple-300';
    case 'delivered':
      return 'bg-green-900/20 text-green-300';
    case 'cancelled':
      return 'bg-red-900/20 text-red-300';
    default:
      return 'bg-gray-900/20 text-gray-300';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-900/20 text-green-300';
    case 'unpaid':
      return 'bg-red-900/20 text-red-300';
    case 'pending':
      return 'bg-yellow-900/20 text-yellow-300';
    default:
      return 'bg-gray-900/20 text-gray-300';
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
}: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No orders found</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-900/50">
          <TableRow className="border-gray-700 hover:bg-transparent">
            <TableHead className="text-yellow-400">Order ID</TableHead>
            <TableHead className="text-yellow-400">Customer</TableHead>
            <TableHead className="text-yellow-400">Delivery Type</TableHead>
            <TableHead className="text-yellow-400">Payment Method</TableHead>
            <TableHead className="text-yellow-400">Payment Status</TableHead>
            <TableHead className="text-yellow-400">Status</TableHead>
            <TableHead className="text-yellow-400">Total Amount</TableHead>
            <TableHead className="text-yellow-400">Order Date</TableHead>
            <TableHead className="text-yellow-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="border-gray-700 hover:bg-gray-900/30 transition-colors"
            >
              <TableCell className="text-white font-medium">{order.id}</TableCell>
              <TableCell className="text-gray-300">{order.customerName}</TableCell>
              <TableCell className="text-gray-300">{order.deliveryType}</TableCell>
              <TableCell className="text-gray-300">{order.paymentMethod}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus.charAt(0).toUpperCase() +
                    order.paymentStatus.slice(1)}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-yellow-400 font-semibold">
                {formatCurrency(order.totalAmount)}
              </TableCell>
              <TableCell className="text-gray-300">{formatDate(order.orderDate)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onViewClick(order)}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {order.paymentStatus === 'unpaid' && (
                    <Button
                      onClick={() => onMarkAsPaidClick(order)}
                      size="sm"
                      className="bg-yellow-600 text-white hover:bg-yellow-700"
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      Paid
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
