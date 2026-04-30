import type { UserNotification } from "../../types/userNotification.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import ReturnDetails from "../return-request/ReturnDetails";
import SaleDetails from "./SaleDetails";
import WithdrawalRequestDetails from "../withdrawalRequest/WithdrawalRequestDetails";
import StockTransferItems from "../stockTransferLog/StockTransferItems";

interface NotificationModalProps {
    open: boolean;
    close: () => void;
    notification: UserNotification | null;
}

export default function NotificationModal ({ open, close, notification } : NotificationModalProps) {
    
    if(notification?.withdrawalNotification) {
        return (
            <WithdrawalRequestDetails 
                withdrawal_id={notification.withdrawalNotification.withdrawal_id} 
                close={close}
            />
        )
    }

    if(notification?.stockTransferNotification) {
        return (
            <StockTransferItems 
                close={close}
                open={notification && notification.stockTransferNotification !== undefined}
                transfer_id={notification.stockTransferNotification.stock_transfer_id}
            />
        )
    }

    return (
        <Modal
            onClose={close}
            open={open}
        >
            <Card>
                {notification?.saleNotification && <SaleDetails close={close} saleNotification={notification.saleNotification}/>}
                {notification?.returnNotification && <ReturnDetails close={close} return_id={notification.returnNotification.returnRequest._id}/>}
            </Card>
        </Modal>
    )
}