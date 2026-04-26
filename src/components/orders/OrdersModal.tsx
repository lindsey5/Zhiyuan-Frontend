import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import { X } from "lucide-react";
import { formatToPeso } from "../../utils/utils";
import OrderStatusChip from "./OrderStatusChip";
import type { Order } from "../../types/order.type";
import { useOrderActions } from "../../hooks/useOrders";
 

type Props = {
    order: Order | null;
    open: boolean;
    onClose: () => void;
};

type ActionType =
    | "paid"
    | "processing"
    | "delivered"
    | "completed"
    | "cancelled"
    | "refunded";

type ActionButton = {
    label: string;
    action: ActionType;
    variant?: "gold" | "default";
};

export default function OrderDetailsModal({
    order,
    open,
    onClose
}: Props) {

    const {
        runOrderAction,
        isPending
     } = useOrderActions();
     
     if (!order) return null;


    const getAllowedActions = (): ActionButton[] => {

        if (order.payment_status === "unpaid") {
            if (order.status === "pending") {
                return [
                    {
                        label: "Mark as Paid",
                        action: "paid",
                        variant: "gold"
                    },
                    {
                        label: "Cancel Order",
                        action: "cancelled"
                    }
                ];
            }

            return [];
        }

        switch (order.status) {

            case "pending":

                if(order.delivery_type==="pickup"){
                    return [
                        {
                            label:"Mark as Completed",
                            action:"completed",
                            variant:"gold"
                        },
                        {
                            label:"Cancel Order",
                            action:"cancelled"
                        }
                    ];
                }

                return [
                    {
                         label:"Mark as Processing",
                         action:"processing",
                        variant:"gold"
                    },
                    {
                        label:"Cancel Order",
                        action:"cancelled"
                    }
                ];

            case "processing":
                return [
                    {
                        label: "Mark as Delivered",
                        action: "delivered",
                        variant: "gold"
                    },
                    {
                        label: "Cancel Order",
                        action: "cancelled"
                    }
                ];

            case "delivered":
                return [
                    {
                        label: "Mark as Completed",
                        action: "completed",
                        variant: "gold"
                    }
                ];

            case "completed":
                return [
                    {
                        label: "Mark as Refunded",
                        action: "refunded"
                    }
                ];

            case "cancelled":
            case "refunded":
            default:
                return [];
        }
    };


    const handleAction = async (action: ActionType) => {
        await runOrderAction(
            order._id,
            action,
            order.payment_method
            );
    
        onClose();
    };

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
                        <p className="font-medium">
                            {order.customer_name}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <p className="text-gray-400">
                                Order ID
                            </p>
                            <p>{order.order_id}</p>
                        </div>

                        <div>
                            <p className="text-gray-400">
                                Delivery Type
                            </p>
                            <p className="capitalize">
                                For {order.delivery_type}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400">
                                Payment Method
                            </p>
                            <p>
                                {order.payment_method || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400">
                                Payment Status
                            </p>
                            <p className="capitalize">
                                {order.payment_status}
                            </p>
                        </div>

                    </div>

                    <div>
                        <p className="text-gray-400 mb-1">
                            Delivery Status
                        </p>

                        <OrderStatusChip
                            status={order.status}
                        />
                    </div>

                    <div>
                        <p className="text-gray-400">
                            Total Amount
                        </p>

                        <p className="text-lg font-semibold">
                            {formatToPeso(
                                order.total_amount
                            )}
                        </p>
                    </div>

                </div>


                <div className="flex justify-end gap-3 pt-6 flex-wrap">

                    <Button
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Close
                    </Button>


                    {getAllowedActions().map((btn) =>
                        btn.variant === "gold" ? (
                            <GoldButton
                                key={btn.action}
                                disabled={isPending}
                                onClick={() =>
                                    handleAction(btn.action)
                                }
                            >
                                {btn.label}
                            </GoldButton>
                        ) : (
                            <Button
                                key={btn.action}
                                disabled={isPending}
                                onClick={() =>
                                    handleAction(btn.action)
                                }
                            >
                                {btn.label}
                            </Button>
                        )
                    )}

                </div>

            </Card>
        </Modal>
    );
}