import Card from "../ui/Card";
import Modal from "../ui/Modal";
import ReturnDetails from "../return-request/ReturnDetails";

interface ReturnRequestModalProps {
    open: boolean;
    close: () => void;
    return_id: string | null;
}

export default function ReturnRequestModal ({ open, close, return_id } : ReturnRequestModalProps) {
    
    return (
        <Modal
            onClose={close}
            open={open}
        >
            <Card>
               <ReturnDetails close={close} return_id={return_id}/>
            </Card>
        </Modal>
    )
}