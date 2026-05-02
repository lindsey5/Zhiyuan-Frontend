import { useState, type Dispatch, type SetStateAction } from "react";
import Card from "../ui/Card";
import Chip from "../ui/Chip";
import QuantityControls from "./QuantityControls";
import GoldButton from "../ui/GoldButton";
import type { Variant } from "../../types/variant.type";
import type { CartItem } from "./ItemsToDistribute";
import Button from "../ui/Button";
import { Package, X } from "lucide-react";
import { cn } from "../../utils/utils";

interface DistributionSummaryProps {
    variants: { variant: Variant; quantity: number; product_name: string }[];
    distributorId: string | null;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    handleQuantity: (quantity: number, item: CartItem) => void;
    remove: (id: string) => void;
}

export default function DistributionSummary({
    setShowModal,
    variants,
    distributorId,
    handleQuantity,
    remove
}: DistributionSummaryProps) {
    const [openSheet, setOpenSheet] = useState(false);

    return (
        <>
            {/* ================= MOBILE FLOATING BUTTON ================= */}
            <GoldButton
                className="lg:hidden fixed bottom-4 right-4 z-30 rounded-full px-4 py-3 shadow-lg flex items-center gap-2"
                onClick={() => setOpenSheet(true)}
            >
                <Package size={18} />
                Items ({variants.length})
            </GoldButton>

            {/* ================= MOBILE BACKDROP ================= */}
            {openSheet && (
                <div
                    onClick={() => setOpenSheet(false)}
                    className="lg:hidden fixed inset-0 bg-black/40 z-20"
                />
            )}

            {/* ================= MOBILE BOTTOM SHEET ================= */}
            <div
                className={cn(
                    "bg-panel lg:hidden fixed bottom-0 left-0 right-0 z-30",
                    "rounded-t-2xl shadow-xl border border-gray",
                    "transition-transform duration-300 flex flex-col",
                    "max-h-[85vh]",
                    openSheet ? "translate-y-0" : "translate-y-full"
                )}
            >
                {/* HEADER */}
                <div className="p-4 border-b border-[var(--border-panel)] flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-base">
                            Items to Distribute
                        </h2>
                        <p className="text-xs text-gray">
                            {variants.length === 0
                                ? "No items selected"
                                : `${variants.length} item(s) selected`}
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenSheet(false)}
                        className="text-gray"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* LIST */}
                <div className="flex-1 overflow-y-auto space-y-2 p-3">
                    {variants.length === 0 ? (
                        <div className="text-center text-gray text-sm py-10">
                            Select products to add here
                        </div>
                    ) : (
                        variants.map((item) => (
                            <div
                                key={item.variant._id}
                                className="border border-gray rounded-xl p-3 flex justify-between items-end"
                            >
                                <div className="flex flex-col items-start gap-3">
                                    <p className="text-sm font-medium">
                                        {item.product_name}
                                    </p>

                                    <Chip>{item.variant.variant_name}</Chip>

                                    <Button
                                        label="Remove"
                                        className="text-xs py-1"
                                        onClick={() => remove(item.variant._id)}
                                    />
                                </div>

                                <QuantityControls
                                    handleQuantity={handleQuantity}
                                    item={item}
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER */}
                <div className="border-t border-[var(--border-panel)] p-4">
                    <p className="text-xs text-red-500">
                        {variants.length > 0 && !distributorId && "Select Distributor"}
                    </p>

                    <GoldButton
                        disabled={variants.length === 0 || !distributorId}
                        onClick={() => {
                            setOpenSheet(false);
                            setShowModal(true);
                        }}
                        className="mt-3 w-full py-2 text-sm"
                    >
                        Confirm Distribution
                    </GoldButton>
                </div>
            </div>

            {/* ================= DESKTOP SIDEBAR ================= */}
            <div className="hidden sticky top-5 lg:flex w-96 shrink-0 max-h-150">
                <Card className="w-full border border-[var(--border-panel)] rounded-xl p-4 flex flex-col min-h-0">
                    <h2 className="font-semibold text-base mb-1">
                        Items to Distribute
                    </h2>

                    <p className="text-xs text-gray mb-4">
                        {variants.length === 0
                            ? "No items selected"
                            : `${variants.length} item(s) selected`}
                    </p>

                    {/* LIST */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {variants.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray text-sm">
                                Select products to add here
                            </div>
                        ) : (
                            variants.map((item) => (
                                <div
                                    key={item.variant._id}
                                    className="border border-[var(--border-panel)] rounded-xl p-3 flex justify-between items-start"
                                >
                                    <div className="flex flex-col items-start gap-3">
                                        <p className="text-sm font-medium">
                                            {item.product_name}
                                        </p>

                                        <Chip>{item.variant.variant_name}</Chip>

                                        <QuantityControls
                                            handleQuantity={handleQuantity}
                                            item={item}
                                        />
                                    </div>

                                    <Button
                                        label="Remove"
                                        className="text-xs py-1"
                                        onClick={() => remove(item.variant._id)}
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    <p className="text-xs text-red-500">
                        {variants.length > 0 && !distributorId && "Select Distributor"}
                    </p>

                    <GoldButton
                        disabled={variants.length === 0 || !distributorId}
                        onClick={() => setShowModal(true)}
                        className="mt-4 w-full py-2 text-sm"
                    >
                        Confirm Distribution
                    </GoldButton>
                </Card>
            </div>
        </>
    );
}