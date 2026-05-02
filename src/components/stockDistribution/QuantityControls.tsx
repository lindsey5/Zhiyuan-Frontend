import { Minus, Plus } from "lucide-react";
import { cn } from "../../utils/utils";
import type { CartItem } from "./ItemsToDistribute";

interface QuantityControlsProps {
    handleQuantity: (quantity: number, item: CartItem) => void;
    item: CartItem;
}

export default function QuantityControls ({ handleQuantity, item } : QuantityControlsProps) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleQuantity(-1, item)}
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
                onClick={() => handleQuantity(1, item)}
                disabled={item.quantity >= item.variant.stock}
                className="cursor-pointer rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Plus size={16} />
            </button>
        </div>
    )
}