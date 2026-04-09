import { useMemo, useState } from "react";
import type { VariantWithProduct } from "../../types/variant.type";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import { formatToPeso } from "../../utils/utils";

interface EnterQuantityProps {
    open: boolean;
    close: () => void;
    variant: VariantWithProduct | null;
    addVariant: (variant : VariantWithProduct, quantity: number) => void;
}

export default function EnterQuantity ({ addVariant, close, open, variant } : EnterQuantityProps) {
    const [quantity, setQuantity] = useState<number>(0);

    const stock = variant?.stock || 0

    const isExceedingStock = useMemo(() => (quantity || 0) > stock, [quantity, stock]);
    const isInvalid = useMemo(() => (quantity || 0) <= 0, [quantity]);

    const errorMessage = useMemo(() => {
        return stock === 0 
        ? "No available stock" 
        : isInvalid 
        ? "Quantity must be greater than 0"
        : isExceedingStock
        ? "Quantity exceeds available stock"
        : "";
    }, [isInvalid, isExceedingStock])
    
    
    const handleAddToCart = () => {
        if(variant) {
            addVariant(variant, quantity);
            close();
        }
    }

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Card className="space-y-5">
                <div className="flex gap-3">
                <img className="w-20 h-20" src={variant?.image_url} alt="" />
                <div>
                    <h1 className="text-sm xl:text-md font-bold">{variant?.variant_name}</h1>
                    <p className="text-sm xl:text-md">Available Stock: {stock}</p>
                    <p className="text-sm xl:text-md">Price: {formatToPeso(variant?.price || 0)}</p>
                </div>
                </div>

                <TextField
                    label="Enter Quantity"
                    placeholder="eg. 1"
                    type="number"
                    value={quantity ? quantity?.toString() : ""}
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

                <div className="flex justify-end">
                <Button
                    className="py-1 px-10"
                    disabled={!quantity || isInvalid || isExceedingStock}
                    onClick={handleAddToCart}
                    label="Transfer Item"
                />
                </div>
            </Card>

        </Modal>
    )
}