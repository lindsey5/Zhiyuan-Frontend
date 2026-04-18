import type { UserNotification } from "../../types/userNotification.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import ReturnDetails from "../return-request/ReturnDetails";
import SaleDetails from "./SaleDetails";

interface NotificationModalProps {
    open: boolean;
    close: () => void;
    notification: UserNotification | null;
}

export default function NotificationModal ({ open, close, notification } : NotificationModalProps) {
    
    return (
        <Modal
            onClose={close}
            open={open}
        >
            <Card>
                {notification?.saleNotification && <SaleDetails close={close} saleNotification={notification.saleNotification}/>}
                {notification?.returnNotification && <ReturnDetails close={close} returnRequest={notification.returnNotification.returnRequest}/>}
            </Card>
        </Modal>
    )
}