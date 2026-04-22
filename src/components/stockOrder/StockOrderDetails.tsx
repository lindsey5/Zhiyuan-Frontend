import { X } from "lucide-react";
import { useSocket } from "../../hooks/useSocket";
import { useStockOrder } from "../../hooks/useStockOrder";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import type { StockOrder, StockOrderStatus } from "../../types/stock-order.type";
import DeliveryStatusChip from "../ui/DeliveryStatusChip";
import { formatDate } from "../../utils/utils";
import Chip from "../ui/Chip";
import StockOrderStatusButtons from "./StockOrderStatusButtons";
import { promiseToast } from "../../utils/sileo";

interface StockOrderDetailsProps{
    stock_order_id: string | null;
    close: () => void;
}

function StockOrderDetailsSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="h-5 w-40 bg-loading rounded" />
                <div className="h-5 w-5 bg-loading rounded" />
            </div>

            {/* Requested By */}
            <div className="space-y-2 border-b pb-3 border-[var(--border-panel)]">
                <div className="h-3 w-24 bg-loading rounded" />
                <div className="h-4 w-40 bg-loading rounded" />
                <div className="h-3 w-32 bg-loading rounded" />
                <div className="h-3 w-28 bg-loading rounded" />
            </div>

            {/* Dates */}
            <div className="space-y-2">
                <div className="h-3 w-48 bg-loading rounded" />
                <div className="h-3 w-48 bg-loading rounded" />
            </div>

            {/* Status */}
            <div className="h-6 w-24 bg-loading rounded" />

            {/* Items */}
            <div className="space-y-3 pt-2">
                {[1, 2].map((i) => (
                    <div key={i} className="flex gap-3 items-center border-b pb-3 border-[var(--border-panel)]">
                        <div className="w-14 h-14 bg-loading rounded" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-40 bg-loading rounded" />
                            <div className="h-5 w-20 bg-loading rounded" />
                        </div>
                        <div className="h-4 w-20 bg-loading rounded" />
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="h-10 w-full bg-loading rounded" />
        </div>
    );
}

export default function StockOrderDetails ({ stock_order_id, close } : StockOrderDetailsProps) {
    const { updateStockOrderStatus, getStockOrderById } = useStockOrder();
    
    useSocket({ namespace: '/distributor-notifiation' });
    const { data, isFetching} = getStockOrderById(stock_order_id || "");
    const [stockOrder, setStockOrder] = useState<StockOrder | null>(null);

    const updateStatus = async (status: string) => {
        if(!stockOrder || updateStockOrderStatus.isPending) return;
    
        const isConfirmed = confirm(`Are you sure you want to mark this as "${status}"?`);

        if(!isConfirmed) return;

        const response = await promiseToast(
            updateStockOrderStatus.mutateAsync({
                id: stockOrder._id,
                status,
            }),
            "top-center",
            () => {}
        )

        if(response.success){
            setStockOrder(prev => ({ ...prev!, status: status as StockOrderStatus}))
        }

    }

    useEffect(() => {
        if(data?.stockOrder) setStockOrder(data.stockOrder);
    }, [data])


    return (
        <Modal open={stock_order_id !== null} onClose={close}>
            <Card>
                {isFetching || !stockOrder ? (
                    <StockOrderDetailsSkeleton />
                ) : (
                    <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-md md:text-lg font-bold">Stock Order Details</h2>
                        <button
                            onClick={close}
                            className="cursor-pointer hover:opacity-50"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 text-sm pb-3 px-2 border-b border-[var(--border-panel)]">
                        
                        <div className="flex flex-col gap-1">
                            <p className="text-xs uppercase tracking-wide">Requested By:</p>
                            <p className="font-medium">{stockOrder?.distributor.distributor_name}</p>
                            <p>{stockOrder?.distributor.email}</p>
                            <p>{stockOrder?.distributor.distributor_id}</p>
                        </div>

                        <div className="flex flex-col gap-1 pt-2">
                            <p>
                                Date Requested: <span className="font-medium">{formatDate(stockOrder?.createdAt)}</span>
                            </p>

                            {stockOrder?.status === "received" && (
                                <p>
                                    Date Received: <span className="font-medium">{formatDate(stockOrder.updatedAt)}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex justify-start pt-2">
                            <DeliveryStatusChip status={stockOrder?.status || ""} />
                        </div>
                    </div>
                    <h2 className="text-md font-semibold my-3">Items</h2>
                    <div className="space-y-3">
                    {stockOrder?.items.map(item => (
                            <div
                                key={item.variant._id}
                                className="flex flex-col md:flex-row md:items-start gap-2 md:gap-3 border-b border-[var(--border-panel)] py-3"
                            >
                                <img
                                    src={item.variant.image_url}
                                    alt={item.variant.variant_name}
                                    className="w-14 h-14 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <p className="font-medium text-sm mb-2">
                                        {item.variant.product.product_name}
                                    </p>
                                    <Chip>{item.variant.variant_name}</Chip>
                                </div>
                                <p className="text-sm font-semibold">
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                    ))}
                    </div>
                    <StockOrderStatusButtons 
                        currentStatus={stockOrder?.status || ""}
                        onChangeStatus={updateStatus}
                    />
                    </>
                )}
            </Card>
        </Modal>
    )
}