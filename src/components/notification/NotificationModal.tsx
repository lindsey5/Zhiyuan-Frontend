import { X } from "lucide-react";
import type { SaleNotification, UserNotification } from "../../types/userNotification.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { formatToPeso } from "../../utils/utils";
import { useMemo } from "react";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

interface NotificationModalProps {
    open: boolean;
    close: () => void;
    notification: UserNotification | null;
}

function SaleDetails ({ saleNotification, close } : { saleNotification: SaleNotification, close: () => void}) {
    const totalSales = useMemo(() => {
        return saleNotification.sales.reduce((total, sale) => sale.total_amount + total, 0)
    }, [saleNotification])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-md md:text-lg font-bold">Sale Details</h2>
                <button
                    onClick={close}
                    className="cursor-pointer hover:opacity-50"
                >
                    <X />
                </button>
            </div>
            <div className="border-y border-[var(--border-panel)] pb-4 pt-6">
                <h1 className="font-bold">Seller:</h1>
                <p className="text-xs md:text-sm">{saleNotification.sold_by.distributor_name}</p>
                <p className="text-xs md:text-sm text-gray">{saleNotification.sold_by.email}</p>
                <p className="text-xs md:text-sm font-bold">ID: {saleNotification.sold_by.distributor_id}</p>
            </div>
            <div className="space-y-3 max-h-[20vh] overflow-y-auto">
                <p className="font-bold text-sm md:text-base">Sold Items:</p>
                {saleNotification.sales.map(sale => (
                    <div
                        key={sale._id}
                        className="flex items-center gap-3 border-b border-[var(--border-panel)] py-3"
                    >
                        <img
                            src={sale.variant.image_url}
                            alt={sale.variant.variant_name}
                            className="w-14 h-14 object-cover rounded"
                        />

                        <div className="flex-1">
                            <p className="font-bold text-sm mb-2">
                                {sale.variant.product.product_name}
                            </p>
                            <Chip>{sale.variant.variant_name}</Chip>
                            <p className="font-medium text-xs md:text-sm mt-3">Quantity: {sale.quantity}</p>
                            <p className="font-bold text-xs md:text-sm mt-1">Sales: {formatToPeso(sale.total_amount)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="font-bold text-sm md:text-base">Total Sales: {formatToPeso(totalSales)}</p>
            <div className="flex justify-end">
                <Button
                    className="md:px-4 lg:py-3"
                    label="Close"   
                    onClick={close}  
                />
            </div>
        </div>
    )


}

export default function NotificationModal ({ open, close, notification } : NotificationModalProps) {
    
    return (
        <Modal
            onClose={close}
            open={open}
        >
            <Card>
                {notification?.saleNotification && <SaleDetails close={close} saleNotification={notification?.saleNotification}/>}
            </Card>

        </Modal>
    )
}