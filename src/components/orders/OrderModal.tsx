import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { formatDate, formatToPeso } from "../../utils/utils";
import DeliveryStatusChip from "../ui/DeliveryStatusChip";
import Chip from "../ui/Chip";
import GoldButton from "../ui/GoldButton";
import { useOrder } from "../../hooks/useOrder";
import { useEffect, useState } from "react";
import PaymentModal from "./PaymentModal";
import type { Order } from "../../types/order.type";
import OrderStatusButtons from "./OrdeStatusButtons";
import IconButton from "../ui/IconButton";
import { X } from "lucide-react";
import { promiseToast } from "../../utils/sileo";

interface OrderModalProps {
    order_id: string | null;
    close: () => void;
}

function OrderSkeleton() {
    return (
        <div className="animate-pulse space-y-6">
            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-loading rounded" />
                    <div className="h-3 w-24 bg-loading rounded" />
                    <div className="h-6 w-20 bg-loading rounded-full" />
                </div>

                <div className="h-9 w-9 bg-loading rounded-full" />
            </div>

            {/* INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-3 w-20 bg-loading rounded" />
                        <div className="h-4 w-40 bg-loading rounded" />
                    </div>
                ))}
            </div>

            {/* ADDRESS */}
            <div className="pt-4 border-t border-[var(--border-panel)] space-y-2">
                <div className="h-3 w-28 bg-loading rounded" />
                <div className="h-4 w-full bg-loading rounded" />
                <div className="h-4 w-2/3 bg-loading rounded" />
            </div>

            {/* ITEMS */}
            <div className="pt-4 border-t border-[var(--border-panel)] space-y-3">
                <div className="h-3 w-16 bg-loading rounded" />

                <div className="space-y-3 max-h-[30vh] overflow-hidden">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="w-14 h-14 bg-loading rounded-md" />

                                <div className="space-y-2">
                                    <div className="h-4 w-40 bg-loading rounded" />
                                    <div className="h-5 w-24 bg-loading rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-2 text-right">
                                <div className="h-3 w-20 bg-loading rounded ml-auto" />
                                <div className="h-4 w-16 bg-loading rounded ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TOTAL */}
            <div className="pt-4 border-t border-[var(--border-panel)] space-y-3">
                <div className="flex justify-between items-center">
                    <div className="h-3 w-16 bg-loading rounded" />
                    <div className="h-6 w-24 bg-loading rounded" />
                </div>

                <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-loading rounded" />
                    <div className="h-4 w-20 bg-loading rounded" />
                </div>

                <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-loading rounded" />
                    <div className="h-4 w-20 bg-loading rounded" />
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-2">
                <div className="h-10 w-28 bg-loading rounded-md" />
                <div className="h-10 w-36 bg-loading rounded-md" />
            </div>
        </div>
    );
}

export default function OrderModal({ close, order_id }: OrderModalProps) {
    const { getOrderById } = useOrder();
    const { data, isFetching } = getOrderById(order_id || "");
    const [order, setOrder] = useState<Order | null>(null);
    const [showPayment, setShowPayment] = useState(false);
    const { updateOrderStatus } = useOrder();

    const handleClose = () => {
        close();
        setShowPayment(false);
    }

    useEffect(() => {
        if(data?.order) setOrder(data.order)
    }, [data])

    const handleUpdate = async (status : string) => {
        if(!order) return;

        const isConfirmed = confirm(`Are you sure you want to mark this as "${status}"?`);

        if (!isConfirmed) return;

        const response = await promiseToast(
            updateOrderStatus.mutateAsync({
                id: order._id,
                data: {
                    status
                }
            }),
            "top-center",
            () => {}
        )

        if(response.success){
            setOrder(response.order);
        }
    }

    return (
        <>
        <PaymentModal 
            order={order}
            setOrder={setOrder}
            open={showPayment} 
            close={handleClose} 
            back={() => setShowPayment(false)}
        />
        <Modal open={order_id !== null && !showPayment} onClose={handleClose}>
            <Card className="max-w-2xl max-h-[80vh] overflow-y-auto w-full p-6 space-y-6">
        
                {/* LOADING STATE */}
                {isFetching || !order ? (
                    <OrderSkeleton />
                ) : (
                    <>
                        {/* HEADER */}
                        <div className="flex items-start justify-between">
                            <div className="space-y-1 flex flex-col items-start">
                                <h1 className="text-base font-semibold">
                                    Order Details
                                </h1>
                                <p className="text-xs mb-3">
                                    {formatDate(order.createdAt)}
                                </p>
                                <DeliveryStatusChip status={order.status} />
                            </div>

                            <IconButton 
                                onClick={close}
                                icon={<X size={20}/>}
                            />

                        </div>

                        {/* INFO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            <div className="space-y-1">
                                <p className="text-xs text-gray">Order ID</p>
                                <p className="font-medium">{order.order_id}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs text-gray">Customer</p>
                                <p className="font-medium">{order.customer_name}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs text-gray">Delivery Type</p>
                                <p className="font-medium capitalize">
                                    {order.delivery_type}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs text-gray">Payment</p>
                                <p className="font-medium capitalize">
                                    {order.payment_method} •{" "}
                                    <span>{order.payment_status}</span>
                                </p>
                            </div>
                        </div>

                        {/* ADDRESS */}
                        {order.delivery_type === "delivery" && order.address && (
                            <div className="pt-4 border-t border-[var(--border-panel)]">
                                <p className="text-xs text-gray mb-2">
                                    Delivery Address
                                </p>
                                <p className="text-sm font-medium">
                                    {order.address.street}, {order.address.barangay},{" "}
                                    {order.address.city}
                                </p>
                            </div>
                        )}

                        {/* ITEMS */}
                        <div className="pt-4 border-t border-[var(--border-panel)] space-y-3">
                            <p className="text-xs text-gray">Items</p>

                            <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
                                {order.order_items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-start justify-between"
                                    >
                                        <div className="flex flex-1 gap-3">
                                            <img
                                                className="w-15 h-15"
                                                src={item.variant.image_url}
                                                alt=""
                                            />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium mb-2">
                                                    {item.variant.product?.product_name}
                                                </p>
                                                <Chip>{item.variant.variant_name}</Chip>
                                            </div>
                                        </div>

                                        <div className="text-right space-y-1">
                                            <p className="text-xs text-gray">
                                                {item.quantity} x{" "}
                                                {formatToPeso(item.price)}
                                            </p>
                                            <p className="text-sm font-semibold">
                                                {formatToPeso(item.amount)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--border-panel)] space-y-3">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray">Total</p>
                                <p className="text-lg font-semibold">
                                    {formatToPeso(order.total_amount)}
                                </p>
                            </div>

                            {order.payment_status === 'paid' && (
                                <>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray">Payment</p>
                                    <p className="text-sm font-medium">
                                        {formatToPeso(order.payment)}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray">Change</p>
                                    <p className="text-sm font-medium text-green-500">
                                        {formatToPeso(order.change)}
                                    </p>
                                </div>
                                </>
                            )}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center items-center justify-end gap-3">

                            {order.status === "pending" && !order.payment_method && (
                                <GoldButton 
                                    className="text-sm rounded-sm"
                                    onClick={() => setShowPayment(true)}
                                >
                                    Mark as Paid
                                </GoldButton>
                            )}
                            {order.payment_status === 'paid' && (
                                <OrderStatusButtons 
                                    currentStatus={order.status}
                                    onChangeStatus={handleUpdate}
                                />
                            )}
                        </div>
                    </>
                )}
            </Card>
        </Modal>
        </>
    );
}