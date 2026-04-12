import Card from "../ui/Card";
import Modal from "../ui/Modal";
import ReturnDetails from "../return-request/ReturnDetails";
import type { ReturnRequest } from "../../types/returnRequest.type";

interface ReturnRequestModalProps {
    open: boolean;
    close: () => void;
    returnRequest: ReturnRequest | null;
}

export default function ReturnRequestModal ({ open, close, returnRequest } : ReturnRequestModalProps) {
    return (
        <Modal
            onClose={close}
            open={open}
        >
            <Card>
               <ReturnDetails close={close} returnRequest={returnRequest as ReturnRequest}/>
            </Card>
        </Modal>
    )
}