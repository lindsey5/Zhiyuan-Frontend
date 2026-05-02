import { X } from "lucide-react";
import type { Variant } from "../../types/variant.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import GoldButton from "../ui/GoldButton";
import Button from "../ui/Button";
import { errorToast, promiseToast } from "../../utils/sileo";
import Chip from "../ui/Chip";
import { useMemo } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useStockTransfer } from "../../hooks/useStockTransfer";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import type { Distributor } from "../../types/distributor.type";

export interface CartItem {
    variant: Variant;
    quantity: number;
    product_name: string;
}

interface ItemsToDistributeProps {
    variants: CartItem[];
    distributor: Distributor | null;
    open: boolean;
    close: () => void;
    setVariants: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function ItemsToDistribute({ 
    variants, 
    open, 
    close, 
    distributor,
}: ItemsToDistributeProps) {
    const { hasAnyPermissions } = usePermissions();
    useSocket({ namespace: '/distributor-notification' })
    const { createStockTransferLog } = useStockTransfer();

    const transfer = () => {
        if(!distributor){
            errorToast("Error", "Please select a distributor first.");
            return;
        }

        promiseToast(createStockTransferLog.mutateAsync({
            id: distributor._id || "",
            data: variants.map(variant => ({
                variant_id: variant.variant._id,
                quantity: variant.quantity
            }))
        }), 'top-center', () => {
            if(hasAnyPermissions([
                PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_ALL,
                PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_OWN
            ])){
                window.location.href = '/dashboard/distributors/transfer-logs'
            }else{
                window.location.reload();
            }
        })
    }

    const isValidItems = useMemo(() => {
        return variants.every(variant => variant.quantity)
    }, [variants])

    return (
        <Modal open={open} onClose={close}>
            <Card>
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md xl:text-lg font-bold">Items to Distribute</h2>
                    <button
                        onClick={close}
                        className="cursor-pointer hover:opacity-50"
                    >
                        <X />
                    </button>
                </div>
                <div className="flex flex-col items-start text-sm pb-3 px-2 border-b border-[var(--border-panel)]">
                    <p>Distributor:</p>
                    <p>{distributor?.distributor_name}</p>
                    <p>{distributor?.email}</p>
                    <p className="font-semibold">{distributor?.distributor_id}</p>
                </div>
                {/* Body */}
                <div className="max-h-[70vh] overflow-y-auto space-y-3 py-3">
                {variants.length === 0 ? (
                    <p className="text-sm text-center">No items</p>
                ) : (
                    variants.map(item => (
                        <div
                            key={item.variant._id}
                            className="flex items-start gap-3 border-b border-[var(--border-ui)] py-3"
                        >
                            <img
                                src={item.variant.image_url}
                                alt={item.variant.variant_name}
                                className="w-14 h-14 object-cover rounded"
                            />

                            <div className="flex-1">
                                <p className="text-sm font-bold mb-2">{item.product_name}</p>
                                <Chip>{item.variant.variant_name}</Chip>
                            </div>
                            <p className="text-sm">
                                Quantity: {item.quantity}
                            </p>
                        </div>
                    ))
                )}
                </div>
                {/* Footer */}
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        className="md:px-4 lg:py-3"
                        label="Cancel"   
                        onClick={close}  
                        disabled={createStockTransferLog.isPending}
                    />

                    <GoldButton
                        className="text-xs xl:text-sm md:px-4 lg:py-3"
                        onClick={transfer}
                        disabled={variants.length === 0 || createStockTransferLog.isPending || !isValidItems}
                    >Distribute</GoldButton>
                </div>
            </Card>
        </Modal>
    );
}