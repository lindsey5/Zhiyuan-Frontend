import type { StockTransferLog } from "../../types/stock-transfer-log.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";

interface StockTransferItemsProps {
    open: boolean;
    close: () => void;
    stockTransferLog: StockTransferLog | null;
}

export default function StockTransferItems ({ open, close } : StockTransferItemsProps) {
    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Card>
                <></>
            </Card>
            
        </Modal>
    )
}