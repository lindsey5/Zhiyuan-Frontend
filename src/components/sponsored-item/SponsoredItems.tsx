import { Minus, Plus, X } from "lucide-react";
import type { Variant } from "../../types/variant.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { formatToPeso } from "../../utils/utils";
import GoldButton from "../ui/GoldButton";
import Button from "../ui/Button";
import { promiseToast } from "../../utils/sileo";
import Chip from "../ui/Chip";
import { useSponsoredItem } from "../../hooks/useSponsoredItem";

interface CartItem {
    variant: Variant;
    quantity: number;
    product_name: string;
}

interface ItemsToSponsorProps {
    variants: CartItem[];
    open: boolean;
    close: () => void;
    setVariants: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function ItemsToSponsor({ 
    variants, 
    open, 
    close, 
    setVariants, 
}: ItemsToSponsorProps) {

    const { createSponsoredItems } = useSponsoredItem();
    
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

    const sponsorItems = () => {
        const isConfirmed = confirm("Are you sure you want to sponsor this products?");

        if(!isConfirmed) return;

        promiseToast(createSponsoredItems.mutateAsync({
            newSponsoredItems: variants.map(variant => ({ variant_id: variant.variant._id, quantity: variant.quantity }))
        }))
    }

    return (
        <Modal open={open} onClose={close}>
            <Card>
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md xl:text-lg font-bold">Products To Sponsor</h2>
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
                    <p className="text-sm text-center">No Products Yet</p>
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

                                    <span className="w-6 text-sm text-center font-semibold">
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
                        className="md:px-4 lg:py-3"
                        label="Cancel"   
                        onClick={close}  
                    />

                    <GoldButton
                        className="text-xs xl:text-sm md:px-4 lg:py-3"
                        onClick={sponsorItems}
                        disabled={variants.length === 0 || createSponsoredItems.isPending}
                    >Sponsor Items</GoldButton>
                </div>
            </Card>
        </Modal>
    );
}