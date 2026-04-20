import { X } from "lucide-react";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import { useReturnRequest } from "../../hooks/useReturnRequest";
import { promiseToast } from "../../utils/sileo";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import { formatDate } from "../../utils/utils";
import ReturnRequestItem from "./ReturnRequestItem";
import { useEffect, useState } from "react";
import type { ReturnRequest, ReturnRequestItemStatus } from "../../types/returnRequest.type";

const ReturnDetailsSkeleton = () => {
    return (
        <div className="animate-pulse space-y-5">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-52 rounded bg-loading"></div>
                <div className="h-6 w-6 rounded bg-loading"></div>
            </div>

            {/* Request By Skeleton */}
            <div className="border-y border-[var(--border-panel)] py-4 space-y-2">
                <div className="h-4 w-28 rounded bg-loading"></div>
                <div className="h-4 w-44 rounded bg-loading"></div>
                <div className="h-4 w-60 rounded bg-loading"></div>
                <div className="h-4 w-36 rounded bg-loading"></div>
            </div>

            {/* Items Skeleton */}
            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
            <div className="h-4 w-32 rounded bg-loading"></div>
                <div className="border border-[var(--border-panel)] rounded-lg p-3 space-y-3">
                    <div className="h-4 w-56 rounded bg-loading"></div>
                    <div className="h-4 w-40 rounded bg-loading"></div>
                    <div className="h-4 w-24 rounded bg-loading"></div>

                    <div className="flex gap-2">
                        <div className="h-8 w-20 rounded bg-loading"></div>
                        <div className="h-8 w-20 rounded bg-loading"></div>
                    </div>
                </div>
            </div>

            {/* Date Skeleton */}
            <div className="h-4 w-52 rounded bg-loading"></div>

            {/* Reason Skeleton */}
            <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-loading"></div>
                <div className="h-16 w-full rounded bg-loading"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex justify-end gap-3">
                <div className="h-10 w-24 rounded bg-loading"></div>
                <div className="h-10 w-28 rounded bg-loading"></div>
            </div>
        </div>
    )
}

export default function ReturnDetails ({ return_id, close } : { return_id: string | null, close: () => void }) {
    const { updateAllReturnRequestItems, updateReturnRequestItem } = useReturnRequest(); 
    const { hasPermissions } = usePermissions();
    const [hasInsufficientStock, setHasInsufficientStock] = useState(false);
    const { getReturnRequestById } = useReturnRequest();
    const { data, isFetching } = getReturnRequestById(return_id || "");
    const [returnDetails, setReturnDetails] = useState<ReturnRequest | null>(null);

    const handleUpdateItems = async (status: string) => {
        if(!returnDetails) return;

        const isConfirmed = confirm(`Are you sure you want to mark all items as ${status}?`);

        if(!isConfirmed) return;

        const response = await promiseToast(updateAllReturnRequestItems.mutateAsync({
            status, 
            distributor_id: returnDetails.distributor_id,
            return_id: returnDetails._id
        }), 'top-center', () => {});

        if(response.success){
            setReturnDetails(response.returnRequest);
        }

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
        }), "top-center", () => {
            setReturnDetails(prev => {
                if(!prev) return null;

                return ({
                    ...prev,
                    items: prev.items.map(item => 
                        item.variant_id === variant_id ? ({
                            ...item, 
                            status: status as ReturnRequestItemStatus
                        }) : item
                    )
                })
            })
        })}

    useEffect(() => {
        if(data?.returnRequest) setReturnDetails(data.returnRequest);
    }, [data])

    return (
        <div className="space-y-5">
            {isFetching  ? (
                <ReturnDetailsSkeleton />
            ) : (
                <>
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

                            {returnDetails?.items.every(item => item.status === "accepted") && (
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

                            {!returnDetails?.items.every(item => item.status === "pending" || item.status === "accepted") && (
                                <Button className="md:px-4 lg:py-3" label="Close" onClick={close} />
                            )}
                        </>
                    ) : (
                        <Button className="md:px-4 lg:py-3" label="Close" onClick={close} />
                    )}
                </div>
                </>
            )}
        </div>
    )
}