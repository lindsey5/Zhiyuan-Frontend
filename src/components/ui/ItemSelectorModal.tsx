import { useMemo, useState } from "react";
import type { Product } from "../../types/product.type";
import { type Variant } from "../../types/variant.type";
import Card from "./Card";
import Modal from "./Modal";
import { cn, formatToPeso } from "../../utils/utils";
import TextField from "./TextField";
import GoldButton from "./GoldButton";
import { X } from "lucide-react";

interface ItemSelectorModalProps {
    selectedProduct: Product | null;
    close: () => void;
    addVariant: (variant: Variant, quantity: number, product_name: string) => void;
}

export default function ItemSelectorModal ({ selectedProduct, addVariant, close } : ItemSelectorModalProps) {
    const [quantity, setQuantity] = useState<number>(0);
    const [selectedVariant, setSelectedVariant] = useState<Variant>();

    const stock = selectedVariant?.stock || 0

    const isExceedingStock = useMemo(() => (quantity || 0) > stock, [quantity, stock]);
    const isInvalid = useMemo(() => (quantity || 0) <= 0, [quantity]);

    const errorMessage = useMemo(() => {
        if(!quantity) return ""

        return stock === 0 
            ? "No available stock" 
            : isInvalid 
            ? "Quantity must be greater than 0"
            : isExceedingStock
            ? "Quantity exceeds available stock"
            : "";
    }, [isInvalid, isExceedingStock])

    const handleAddItem = () => {
        if(selectedVariant) {
            setQuantity(0);
            addVariant(selectedVariant, quantity, selectedProduct?.product_name || "");
            close();
        }
    }

    const handleClose = () => {
        setSelectedVariant(undefined);
        setQuantity(0);
        close();
    }

    return (
        <Modal
            open={selectedProduct !== null}
            onClose={handleClose}
        >
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="font-bold text-md md:text-lg">Select Item</h1>
                    <button
                        onClick={handleClose}
                        className="cursor-pointer hover:opacity-50"
                    >
                        <X />
                    </button>
                </div>
                <div className="flex items-start gap-5">
                    <img className="w-30 h-30" src={selectedVariant ? selectedVariant.image_url : selectedProduct?.thumbnail_url} alt="" />
                    <div className="space-y-3">
                        <h1 className="font-bold text-sm md:text-base">{selectedProduct?.product_name}</h1>
                        {selectedVariant && (
                            <div>
                                <p>{formatToPeso(selectedVariant.price)}</p>
                                <p>Stock: {selectedVariant.stock}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 my-5">
                    {selectedProduct?.variants.map(variant => (
                        <button
                            className={cn(
                                "min-w-25 flex gap-3 items-center text-xs border border-[var(--border-panel)] rounded-full pl-2 pr-4 py-1 cursor-pointer",
                                selectedVariant?._id === variant._id && "bg-gold text-inverse"
                            )}
                            onClick={() => setSelectedVariant(selectedVariant?._id === variant._id ? undefined : variant)}
                        >
                            <img className="w-7 h-7 rounded-full" src={variant.image_url} alt="Item Image"/>
                            {variant.variant_name}
                        </button>
                    ))}
                </div>
                <TextField
                    label="Enter Quantity to Distribute"
                    placeholder="eg. 1"
                    type="number"
                    value={quantity ? quantity.toString() : ""}
                    onKeyDown={(e) => {
                        if (e.key === "." || e.key === "," || e.key === "e" || e.key === "-") {
                        e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setQuantity(value ? Number(value) : 0);
                    }}
                    error={errorMessage}
                />
                <div className="flex justify-end mt-5">
                    <GoldButton 
                        disabled={!quantity || isInvalid || isExceedingStock || !selectedVariant}
                        onClick={handleAddItem}
                        className="px-6 py-2 text-sm"
                    >Add Item</GoldButton>
                </div>
            </Card>
        </Modal>
    )
}