import { Minus, Plus, X } from "lucide-react";
import type { Variant } from "../../types/variant.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { cn, formatToPeso } from "../../utils/utils";
import GoldButton from "../ui/GoldButton";
import Button from "../ui/Button";
import { errorToast, promiseToast } from "../../utils/sileo";
import Chip from "../ui/Chip";
import { useMemo } from "react";
import { useSocket } from "../../hooks/useSocket";
import { useStockTransfer } from "../../hooks/useStockTransfer";

interface CartItem {
    variant: Variant;
    quantity: number;
    product_name: string;
}

interface ItemsToDistributeProps {
    variants: CartItem[];
    distributorId: string | null;
    open: boolean;
    close: () => void;
    setVariants: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function ItemsToDistribute({ 
    variants, 
    open, 
    close, 
    setVariants, 
    distributorId
}: ItemsToDistributeProps) {
    useSocket({ namespace: '/distributor-notification' })
    const { createStockTransferLog } = useStockTransfer();
    
    const addQty = (id: string) => {
        setVariants(prev =>
        prev.map(item =>
            item.variant._id === id
            ? item.quantity + 1 > item.variant.stock
                ? item
                : { ...item, quantity: item.quantity + 1 }
            : item
        )
        );
    };

    const minusQty = (id: string) => {
        setVariants(prev =>
        prev
            .map(item =>
            item.variant._id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        );
    };

    const remove = (id: string) => {
        const isConfirmed = confirm("Are you sure you want to remove this item?");

        if(!isConfirmed) return;

        setVariants(prev => prev.filter(item => item.variant._id !== id))
    }

    const transfer = () => {
        if(!distributorId){
            errorToast("Error", "Please select a distributor first.");
            return;
        }

        const isConfirmed = confirm("Are you sure you want to transfer these items to the distributor's stock?");

        if(!isConfirmed) return;

        promiseToast(createStockTransferLog.mutateAsync({
            id: distributorId || "",
            data: variants.map(variant => ({
                variant_id: variant.variant._id,
                quantity: variant.quantity
            }))
        }), 'top-center', () => window.location.href = '/dashboard/distributors/transfer-logs')
    }

    const handleQuantity = (quantity : number, variant: CartItem) => {

        if(quantity <= variant.variant.stock){
            setVariants(prev => 
                prev.map(item => 
                    item.variant._id === variant.variant._id ? ({...item, quantity }) :item
                )
            )
        }
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
                                <p className="text-sm text-gray mt-2">
                                    Available Stock: {item.variant.stock}
                                </p>
                                <p className="text-sm text-gray">
                                    {formatToPeso(item.variant.price)}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => minusQty(item.variant._id)}
                                        className="rounded cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={item.quantity === 1}
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <input 
                                        className={cn(
                                            "w-15 text-center border border-[var(--border-panel)] rounded-md outline-none",
                                            !item.quantity && "border-red-500 border-2" 
                                        )}
                                        value={item.quantity ? item.quantity : ""}
                                        onChange={(e) => handleQuantity(Number(e.target.value), item)}
                                    />

                                    <button
                                        onClick={() => addQty(item.variant._id)}
                                        disabled={item.quantity >= item.variant.stock}
                                        className="cursor-pointer rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <Button
                                    label="Remove"
                                    className="text-xs py-1"
                                    onClick={() => remove(item.variant._id)}
                                />
                            </div>
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