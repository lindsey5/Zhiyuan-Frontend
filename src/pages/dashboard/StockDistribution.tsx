import { useState } from "react";
import PageContainer from "../../components/ui/PageContainer";
import VariantSelector from "../../components/stockDistribution/VariantSelector";
import type { VariantWithProduct } from "../../types/variant.type";
import GoldButton from "../../components/ui/GoldButton";
import DistributorSelector from "../../components/stockDistribution/DistributorSelector";
import { errorToast, successToast } from "../../utils/sileo";
import { ShoppingCart } from "lucide-react";
import TransferCart from "../../components/stockDistribution/TransferCart";

export default function StockDistribution () {
    const [distributorId, setDistributorId] = useState<string | null>(null);
    const [variants, setVariants] = useState<{ variant: VariantWithProduct, quantity: number }[]>([]);
    const [showModal, setShowModal] = useState(false);

    const addVariant = (newVariant: VariantWithProduct, quantity: number) => {
        const existing = variants.find(v => v.variant._id === newVariant._id);

        if (existing) {
            // Check if adding exceeds stock
            if ((existing.quantity + quantity) > existing.variant.stock) {
                errorToast("Quantity exceeds available stock");
                return;
            }

            // Update existing variant quantity
            setVariants(prev => 
                prev.map(v => v.variant._id === newVariant._id ? { ...v, quantity: v.quantity + quantity } : v)
            );
        } else {
            // Check if quantity exceeds stock for new variant
            if (quantity > newVariant.stock) {
                errorToast("Quantity exceeds available stock");
                return;
            }

            // Add new variant
            setVariants(prev => [...prev, { variant: newVariant, quantity }]);
        }

        successToast(`${newVariant.variant_name} successfully added`);
    };

    return (
        <PageContainer
            title="Stock Distribution"
            description="Manage stock transfers from Admin to Distributors"
        >
            <div className="hidden md:flex justify-end">
                <GoldButton 
                    className="text-sm relative" 
                    onClick={() => setShowModal(true)}
                >
                    <ShoppingCart size={20} />
                    Transfer Cart
                    {variants.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {variants.length}
                    </span>}
                </GoldButton>
            </div>
            <div className="flex flex-col gap-5">
                <DistributorSelector 
                    setDistributor={setDistributorId}
                />
                <VariantSelector 
                    addVariant={addVariant}
                />
            </div>
            <TransferCart 
                close={() => setShowModal(false)}
                open={showModal}
                setVariants={setVariants}
                variants={variants}
                distributorId={distributorId}
            />
            <div className="flex md:hidden justify-end">
                <GoldButton 
                    className="text-sm relative" 
                    onClick={() => setShowModal(true)}
                >
                    <ShoppingCart size={20} />
                    Transfer Cart
                    {variants.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {variants.length}
                    </span>}
                </GoldButton>
            </div>
        </PageContainer>
    )
}