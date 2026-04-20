import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import { X } from "lucide-react";
import { formatToPeso } from "../../utils/utils";
import OrderStatusChip from "./OrderStatusChip";
import type { Order } from "../../types/order.type";

type Props = {
    order: Order | null;
    open: boolean;
    onClose: () => void;
};

export default function OrderDetailsModal({ order, open, onClose }: Props) {
    if (!order) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Card className="w-full max-w-lg">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold font-sans">
                        Order Details
                    </h2>
                    <Button
                        className="border-none p-0"
                        icon={<X size={20} />}
                        onClick={onClose}
                    />
                </div>

                <div className="space-y-4 text-sm">

                    <div>
                        <p className="text-gray-400">Customer</p>
                        <p className="font-medium">{order.customer_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-400">Order ID</p>
                            <p>{order.order_id}</p>
                        </div>

                        <div>
                            <p className="text-gray-400">Delivery Type</p>
                            <p className="capitalize">For {order.delivery_type}</p>
                        </div>

                        <div>
                            <p className="text-gray-400">Payment Method</p>
                            <p>{order.payment_method || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-gray-400">Payment Status</p>
                            <p className="capitalize">{order.payment_status}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-400 mb-1">Delivery Status</p>
                        <OrderStatusChip status={order.status} />
                    </div>

                    <div>
                        <p className="text-gray-400">Total Amount</p>
                        <p className="text-lg font-semibold">
                            {formatToPeso(order.total_amount)}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    <Button onClick={onClose}>Close</Button>

                    {order.payment_status !== "paid" && (
                        <GoldButton>
                            Mark as Paid
                        </GoldButton>
                    )}
                </div>
            </Card>
        </Modal>
    );
}