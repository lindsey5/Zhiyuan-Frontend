import { Minus, Plus, X } from "lucide-react";
import type { VariantWithProduct } from "../../types/variant";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { formatToPeso } from "../../utils/utils";
import GoldButton from "../ui/GoldButton";
import Button from "../ui/Button";
import { useDistributorStock } from "../../hooks/useDistributorStock";
import { promiseToast } from "../../utils/sileo";

interface CartItem {
  variant: VariantWithProduct;
  quantity: number;
}

interface TransferCartProps {
  variants: CartItem[];
  distributorId: string | null;
  open: boolean;
  close: () => void;
  setVariants: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function TransferCart({ 
    variants, 
    open, 
    close, 
    setVariants, 
    distributorId
}: TransferCartProps) {

    const { createDistributorStocks } = useDistributorStock();
    
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
        const isConfirmed = confirm("Are you sure you want to transfer these items to the distributor's stock?");

        if(!isConfirmed) return;

        promiseToast(createDistributorStocks.mutateAsync({
            id: distributorId || "",
            data: variants.map(variant => ({
                variant_id: variant.variant._id,
                quantity: variant.quantity
            }))
        }))
    }

    return (
        <Modal open={open} onClose={close}>
            <Card>
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Transfer Cart</h2>
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
                    <p className="text-sm text-center">
                    No items in cart.
                    </p>
                ) : (
                    variants.map(item => (
                        <div
                            key={item.variant._id}
                            className="flex items-center gap-3 border-b border-[var(--border-ui)] py-3"
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
                                    Stock: {item.variant.stock}
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

                                    <span className="w-6 text-center font-semibold">
                                        {item.quantity}
                                    </span>

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
                        label="Cancel"   
                        onClick={close}  
                    />

                    <GoldButton
                        className="text-sm"
                        onClick={transfer}
                        disabled={!distributorId || variants.length === 0 || createDistributorStocks.isPending}
                    >Transfer</GoldButton>
                </div>
            </Card>
        </Modal>
    );
}