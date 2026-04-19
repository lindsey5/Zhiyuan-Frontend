import { X } from "lucide-react";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import { useReturnRequest } from "../../hooks/useReturnRequest";
import { promiseToast } from "../../utils/sileo";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import type { ReturnRequest } from "../../types/returnRequest.type";
import { formatDate } from "../../utils/utils";
import ReturnRequestItem from "./ReturnRequestItem";
import { useEffect, useState } from "react";

export default function ReturnDetails ({ returnRequest, close } : { returnRequest: ReturnRequest, close: () => void }) {
    const { updateAllReturnRequestItems, updateReturnRequestItem } = useReturnRequest(); 
    const { hasPermissions } = usePermissions();
    const [hasInsufficientStock, setHasInsufficientStock] = useState(false);
    const [returnDetails, setReturnDetails] = useState<ReturnRequest | null>(null);

    useEffect(() => {
        setReturnDetails(returnRequest)
    }, [returnRequest])

    const handleUpdateItems = async (status: string) => {
        if(!returnDetails) return;

        const isConfirmed = confirm(`Are you sure you want to mark all items as ${status}?`);

        if(!isConfirmed) return;

        await promiseToast(updateAllReturnRequestItems.mutateAsync({
            status, 
            distributor_id: returnDetails.distributor_id,
            return_id: returnDetails._id
        }));

    }

    const handleUpdateItem = async (status : string, variant_id: string ) => {
        if(!returnDetails) return;

        const variant = returnDetails.items.find(item => item.variant_id === variant_id);
        const isConfirmed = confirm(`Are you sure you want to mark ${variant?.variant.product.product_name}-${variant?.variant.variant_name} as ${status}?`);

        if(!isConfirmed) return;

        await promiseToast(updateReturnRequestItem.mutateAsync({
            status, 
            distributor_id: returnDetails.distributor_id,
            return_id: returnDetails._id,
            variant_id
        }))}

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-md md:text-lg font-bold">Return Request Details</h2>
                <button
                    onClick={close}
                    className="cursor-pointer hover:opacity-50"
                >
                    <X />
                </button>
            </div>
            <div className="border-y border-[var(--border-panel)] py-4">
                <h1 className="font-bold">Request by:</h1>
                <p className="text-xs md:text-sm">{returnDetails?.distributor.distributor_name}</p>
                <p className="text-xs md:text-sm">{returnDetails?.distributor.email}</p>
                <p className="text-xs md:text-sm font-bold">ID: {returnDetails?.distributor.distributor_id}</p>
            </div>
            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
                <h1 className="font-bold">Items to Return:</h1>
                {returnDetails?.items.map(item => (
                    <ReturnRequestItem 
                        key={item._id}
                        distributor_id={returnDetails.distributor_id}
                        disabled={updateAllReturnRequestItems.isPending || updateReturnRequestItem.isPending}
                        handleUpdateItem={handleUpdateItem}
                        hasPermissions={hasPermissions}
                        item={item}
                        setHasInsufficientStock={setHasInsufficientStock}
                    />
                ))}
            </div>
            <p className="text-xs md:text-sm">Date Requested: {formatDate(returnDetails?.createdAt)}</p>
            <div className="space-y-2">
                <h1 className="font-bold text-sm">Reason:</h1>
                <p className="text-break-all px-2 py-3 bg-black/10 max-h-20 overflow-y-auto">{returnDetails?.reason}</p>
            </div>
            <div className="flex justify-end gap-3">
                {hasPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) && !hasInsufficientStock ? (
                    <>
                        {returnDetails?.items.some(item => item.status === "pending") && (
                            <>
                                <Button
                                    className="md:px-4 lg:py-3 bg-red-600 text-white borde-none"
                                    label="Reject All"
                                    disabled={updateAllReturnRequestItems.isPending || updateReturnRequestItem.isPending}
                                    onClick={() => handleUpdateItems("rejected")}
                                />

                                <GoldButton
                                    className="text-sm"
                                    onClick={() => handleUpdateItems("accepted")}
                                    disabled={updateAllReturnRequestItems.isPending || updateReturnRequestItem.isPending}
                                >
                                    Accept All
                                </GoldButton>
                            </>
                        )}

                        {returnDetails?.items.some(item => item.status === "accepted") && (
                            <>
                            <Button 
                                className="text-xs"
                                label="Mark All as Cancelled"
                                onClick={() => handleUpdateItems("cancelled")}
                            />
                            <GoldButton
                                className="text-xs"
                                onClick={() => handleUpdateItems("received")}
                                disabled={updateAllReturnRequestItems.isPending || updateReturnRequestItem.isPending}
                            >
                                Mark All as Received
                            </GoldButton>
                            </>
                        )}

                        {!returnDetails?.items.some(item => item.status === "pending" || item.status === "accepted") && (
                            <Button className="md:px-4 lg:py-3" label="Close" onClick={close} />
                        )}
                    </>
                ) : (
                    <Button className="md:px-4 lg:py-3" label="Close" onClick={close} />
                )}
            </div>
        </div>
    )
}