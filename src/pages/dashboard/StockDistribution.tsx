import { useState } from "react";
import PageContainer from "../../components/ui/PageContainer";
import ProductSelectionPanel from "../../components/stockDistribution/ProductSelectionPanel";
import type { Variant } from "../../types/variant.type";
import DistributorSelector from "../../components/stockDistribution/DistributorSelector";
import { errorToast, successToast } from "../../utils/sileo";
import ItemsToDistribute, { type CartItem } from "../../components/stockDistribution/ItemsToDistribute";
import DistributionSummary from "../../components/stockDistribution/DistributionSummary";
import type { Distributor } from "../../types/distributor.type";

export default function StockDistribution() {
    const [distributor, setDistributor] = useState<Distributor | null>(null);
    const [variants, setVariants] = useState<
        { variant: Variant; quantity: number; product_name: string }[]
    >([]);
    const [showModal, setShowModal] = useState(false);

    const addVariant = (newVariant: Variant, quantity: number, product_name: string) => {
        const existing = variants.find(v => v.variant._id === newVariant._id);

        if (existing) {
            if (existing.quantity + quantity > existing.variant.stock) {
                errorToast("Error", "Quantity exceeds available stock");
                return;
            }

            setVariants(prev =>
                prev.map(v =>
                    v.variant._id === newVariant._id
                        ? { ...v, quantity: v.quantity + quantity }
                        : v
                )
            );
        } else {
            if (quantity > newVariant.stock) {
                errorToast("Error", "Quantity exceeds available stock");
                return;
            }

            setVariants(prev => [...prev, { variant: newVariant, quantity, product_name }]);
        }

        successToast("Success", `${product_name} - ${newVariant.variant_name} added`);
    };

    const handleQuantity = (quantity : number, variant: CartItem) => {

        if(quantity <= variant.variant.stock){
            setVariants(prev => 
                prev.map(item => 
                    item.variant._id === variant.variant._id ? ({...item, quantity: item.quantity + quantity }) :item
                )
            )
        }
    }

    const remove = (id: string) => {
        const isConfirmed = confirm("Are you sure you want to remove this item?");

        if(!isConfirmed) return;

        setVariants(prev => prev.filter(item => item.variant._id !== id))
    }

    return (
        <PageContainer
            title="Distribute Stocks"
            description="Distribute stocks to distributor"
            className="min-h-0 flex flex-col"
        >
            {/* MAIN WORKFLOW LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-5 flex-1 min-h-0">

                {/* LEFT SIDE */}
                <div className="min-w-0 flex-1 flex flex-col gap-5 min-h-0">
                    <DistributorSelector
                        setDistributor={setDistributor}
                        distributor={distributor}
                    />

                    <ProductSelectionPanel addVariant={addVariant} />
                </div>

                <DistributionSummary 
                    distributor={distributor}
                    handleQuantity={handleQuantity}
                    setShowModal={setShowModal}
                    variants={variants}
                    remove={remove}
                />
            </div>

            {/* MODAL */}
            <ItemsToDistribute
                close={() => setShowModal(false)}
                open={showModal}
                setVariants={setVariants}
                variants={variants}
                distributor={distributor}

            />
        </PageContainer>
    );
}