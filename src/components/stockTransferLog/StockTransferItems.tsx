import type { StockTransferLog } from "../../types/stock-transfer-log.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { formatDate, formatToPeso } from "../../utils/utils";
import Chip from "../ui/Chip";
import { X } from "lucide-react";
import StockTransferStatusButtons from "./StockTransferStatusButtons";
import { useStockTransfer } from "../../hooks/useStockTransfer";
import { promiseToast } from "../../utils/sileo";
import StockTransferStatusChip from "./StockTransferStatusChip";
import { useSocket } from "../../hooks/useSocket";

interface StockTransferItemsProps {
    open: boolean;
    close: () => void;
    stockTransferLog: StockTransferLog | null;
}

export default function StockTransferItems ({ open, close, stockTransferLog } : StockTransferItemsProps) {
    const { updateStockTransferLogStatus } = useStockTransfer();
    useSocket({ namespace: '/distributor-notification' })

    const updateStatus = async (status: string) => {
        if (!stockTransferLog) return;

        const isConfirmed = confirm(
            `Are you sure you want to mark this as "${status}"?`
        );

        if (!isConfirmed) return;

        await promiseToast(
            updateStockTransferLogStatus.mutateAsync({
                id: stockTransferLog._id,
                status,
            })
        );
    };

    return (
        <Modal open={open} onClose={close}>
            <Card className="max-h-[80vh] md:max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md md:text-lg font-bold">Distribution Details</h2>
                    <button
                        onClick={close}
                        className="cursor-pointer hover:opacity-50"
                    >
                        <X />
                    </button>
                </div>
                <div className="flex flex-col items-start text-sm pb-3 px-2 border-b border-[var(--border-panel)]">
                    <p>Receiver:</p>
                    <p>{stockTransferLog?.receiver.distributor_name}</p>
                    <p className="font-semibold mb-3">{stockTransferLog?.receiver.distributor_id}</p>
                    <p>Sender: {`${stockTransferLog?.sender.firstname} ${stockTransferLog?.sender.lastname}`}</p>
                    <p>Date: {formatDate(stockTransferLog?.createdAt)}</p>
                    <div className="mt-3">
                         <StockTransferStatusChip status={stockTransferLog?.status || ""} />
                    </div>
                </div>
                <h2 className="text-md font-semibold my-3">Items to Distribute</h2>
                <div className="space-y-3">
                {stockTransferLog?.items.map(item => (
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
                                <p className="text-sm text-gray mt-2">
                                    {formatToPeso(item.variant.price)}
                                </p>
                            </div>
                            <p className="text-sm font-semibold">
                                Quantity: {item.quantity}
                            </p>
                        </div>
                ))}
                </div>
                <StockTransferStatusButtons 
                    currentStatus={stockTransferLog?.status || ""}
                    onChangeStatus={updateStatus}
                />
            </Card>
        </Modal>
    )
}