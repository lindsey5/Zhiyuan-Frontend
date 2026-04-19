import { useEffect, type Dispatch, type SetStateAction } from "react";
import { PERMISSIONS } from "../../config/permission";
import { useDistributorStock } from "../../hooks/useDistributorStock";
import type { ReturnRequestItem } from "../../types/returnRequest.type"
import Chip from "../ui/Chip";
import ReturnRequestStatusChip from "./ReturnRequestStatusChip";

interface ReturnRequestItemProps {
    distributor_id: string;
    item: ReturnRequestItem;
    hasPermissions: (permissions : string[]) => boolean;
    disabled: boolean;
    handleUpdateItem: (status: string, variant_id: string) => Promise<void>;
    setHasInsufficientStock: Dispatch<SetStateAction<boolean>>;
}


export default function ReturnRequestItem ({ item, hasPermissions, disabled, handleUpdateItem, distributor_id, setHasInsufficientStock } :ReturnRequestItemProps) {
    const { getDistributorStock } = useDistributorStock();

    const { data, isFetching } = getDistributorStock(item.variant_id, distributor_id);

    useEffect(() => {
        setHasInsufficientStock( (data?.distributorStock.quantity || 0) < item.quantity)
    }, [data])

    return (
        <div
            key={item.variant_id}
            className="flex items-center gap-3 border-b border-[var(--border-panel)] py-3"
        >
            <img
                src={item.variant.image_url}
                alt={item.variant.variant_name}
                className="w-14 h-14 object-cover rounded"
            />

            <div className="flex-1">
                <p className="font-bold text-sm mb-2">
                    {item.variant.product.product_name}
                </p>
                <Chip>{item.variant.variant_name}</Chip>
                <p className="font-medium text-xs md:text-sm mt-3">Quantity to return: {item.quantity}</p>
                <p className="font-medium text-xs md:text-sm mt-1">Stock: {data?.distributorStock.quantity}</p>
                
                {isFetching ? (
                    <div className="flex gap-3 mt-3">
                        <div className="bg-loading flex-1 h-6"/>
                        <div className="bg-loading flex-1 h-6"/>
                    </div>
                ) : (
                    <div className="flex mt-3 gap-3">
                {item.quantity > (data?.distributorStock.quantity || 0) ? (
                    <>
                    {item.status === 'pending' && (
                        <button 
                            disabled={disabled}
                            className="text-sm text-inverse bg-gold px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                            onClick={() => handleUpdateItem('insufficient stock', item.variant_id)}
                        >
                            Mark as Insufficient Stock
                        </button>
                    )}
                    </>
                ) : (
                    <>
                    {item.status === 'pending' && hasPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) &&
                        <>
                        <button 
                            disabled={disabled}
                            className="text-sm bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                            onClick={() => handleUpdateItem('rejected', item.variant_id)}
                        >Reject</button>
                        <button 
                            disabled={disabled}
                            className="text-sm text-inverse bg-gold px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                            onClick={() => handleUpdateItem('accepted', item.variant_id)}
                        >
                            Accept
                        </button>
                        </>
                    }
                    {item.status === 'accepted' && hasPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) && (
                        <>
                        <button 
                            disabled={disabled}
                            className="border border-gray-400 text-xs px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                            onClick={() => handleUpdateItem('cancelled', item.variant_id)}
                        >Mark as Cancelled</button>
                        <button 
                            disabled={disabled}
                            className="text-xs text-inverse bg-gold px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                            onClick={() => handleUpdateItem('received', item.variant_id)}
                        >Mark as Received</button>
                        </>
                    )}
                    
                    </>
                )}
                </div> 
                )}
            </div>
            <div className="self-start">
                <ReturnRequestStatusChip status={item.status} />
            </div>
        </div>
    )
}