import type { StockTransferLog } from "../../types/stock-transfer-log.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { formatDate, formatToPeso } from "../../utils/utils";
import GoldButton from "../ui/GoldButton";

interface StockTransferItemsProps {
    open: boolean;
    close: () => void;
    stockTransferLog: StockTransferLog | null;
}

export default function StockTransferItems ({ open, close, stockTransferLog } : StockTransferItemsProps) {

    return (
        <Modal open={open} onClose={close}>
            <Card className="max-h-[80vh] md:max-h-[70vh] overflow-y-auto">
                <h2 className="text-md font-semibold mb-3">Transfered Items</h2>
                <div className="space-y-3">
                {stockTransferLog?.items.map(item => (
                        <div
                            key={item.variant._id}
                            className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 border-b border-[var(--border-ui)] py-3"
                        >
                            <img
                                src={item.variant.image_url}
                                alt={item.variant.variant_name}
                                className="w-14 h-14 object-cover rounded"
                            />

                            <div className="flex-1">
                                <p className="font-medium text-sm">
                                    {item.variant.variant_name}
                                </p>
                                <p className="text-sm text-gray">
                                    {formatToPeso(item.variant.price)}
                                </p>
                            </div>
                            <p className="text-sm font-semibold">
                                Quantity: {item.quantity}
                            </p>
                        </div>
                ))}
                </div>
                <div className="my-5 text-sm border border-[var(--border-panel)] p-2 rounded-lg shadow-lg">
                    <h2 className="text-md font-semibold mb-3">Transfer Log Details</h2>
                    <p>Sent by: {`${stockTransferLog?.sender.firstname} ${stockTransferLog?.sender.lastname}`}</p>
                    <p>Received by: {stockTransferLog?.receiver.distributor_name}</p>
                    <p>Date: {formatDate(stockTransferLog?.createdAt)}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <GoldButton
                        className="text-sm"
                        onClick={close}
                    >Close</GoldButton>
                </div>
            </Card>
        </Modal>
    )
}