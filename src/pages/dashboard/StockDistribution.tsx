import { useState } from "react";
import PageContainer from "../../components/ui/PageContainer";
import ProductSelectionPanel from "../../components/stockDistribution/ProductSelectionPanel";
import type { Variant } from "../../types/variant.type";
import GoldButton from "../../components/ui/GoldButton";
import DistributorSelector from "../../components/stockDistribution/DistributorSelector";
import { errorToast, successToast } from "../../utils/sileo";
import TransferItems from "../../components/stockDistribution/TransferItems";
import { useSearchParams } from "react-router-dom";

export default function StockDistribution () {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [distributorId, setDistributorId] = useState<string | null>(id);
    const [variants, setVariants] = useState<{ variant: Variant, quantity: number, product_name: string }[]>([]);
    const [showModal, setShowModal] = useState(false);

    const addVariant = (newVariant: Variant, quantity: number, product_name: string) => {
        const existing = variants.find(v => v.variant._id === newVariant._id);

        if (existing) {
            // Check if adding exceeds stock
            if ((existing.quantity + quantity) > existing.variant.stock) {
                errorToast("Error", "Quantity exceeds available stock");
                return;
            }

            // Update existing variant quantity
            setVariants(prev => 
                prev.map(v => v.variant._id === newVariant._id ? { ...v, quantity: v.quantity + quantity } : v)
            );
        } else {
            // Check if quantity exceeds stock for new variant
            if (quantity > newVariant.stock) {
                errorToast("Error", "Quantity exceeds available stock");
                return;
            }

            // Add new variant
            setVariants(prev => [...prev, { variant: newVariant, quantity, product_name }]);
        }

        successToast("Success", `${product_name}-${newVariant.variant_name} successfully added`);
    };

    return (
        <PageContainer
            title="Stock Distribution"
            className="relative"
            description="Manage stock transfers from Admin to Distributors"
        >
            <div className="flex justify-end">
                <GoldButton 
                    className="text-sm relative" 
                    onClick={() => setShowModal(true)}
                >
                    Transfer Items
                    {variants.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {variants.length}
                    </span>}
                </GoldButton>
            </div>
            <div className="flex flex-col gap-5">
                <DistributorSelector 
                    setDistributor={setDistributorId}
                    defaultDistributor={id}
                />
                <ProductSelectionPanel addVariant={addVariant} />
            </div>
            <TransferItems
                close={() => setShowModal(false)}
                open={showModal}
                setVariants={setVariants}
                variants={variants}
                distributorId={distributorId}
            />
        </PageContainer>
    )
}