import { X } from "lucide-react";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import GoldButton from "../ui/GoldButton";
import { useReturnRequest } from "../../hooks/useReturnRequest";
import { promiseToast } from "../../utils/sileo";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import ReturnRequestStatusChip from "./ReturnRequestStatusChip";
import type { ReturnRequest } from "../../types/returnRequest.type";
import { formatDate } from "../../utils/utils";

export default function ReturnDetails ({ returnRequest, close } : { returnRequest: ReturnRequest, close: () => void }) {
    const { updateAllReturnRequestItems, updateReturnRequestItem } = useReturnRequest(); 
    const { hasPermissions } = usePermissions();

    const handleUpdateItems = async (status: 'accepted' | 'rejected') => {
        const isConfirmed = confirm(`Are you sure you want ${status === 'accepted' ? 'accept' : 'reject'} all items?`);

        if(!isConfirmed) return;

        await promiseToast(updateAllReturnRequestItems.mutateAsync({
            status, 
            distributor_id: returnRequest.distributor_id,
            return_id: returnRequest._id
        }))

    }

    const handleUpdateItem = async (status : string, variant_id: string ) => {
        const variant = returnRequest.items.find(item => item.variant_id === variant_id);
        const isConfirmed = confirm(`Are you sure you want ${status === 'accepted' ? 'accept' : 'reject'} ${variant?.variant.product.product_name}-${variant?.variant.variant_name}?`);

        if(!isConfirmed) return;

        await promiseToast(updateReturnRequestItem.mutateAsync({
            status, 
            distributor_id: returnRequest.distributor_id,
            return_id: returnRequest._id,
            variant_id
        }))
    }

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
                <p className="text-xs md:text-sm">{returnRequest.distributor.distributor_name}</p>
                <p className="text-xs md:text-sm">{returnRequest.distributor.email}</p>
                <p className="text-xs md:text-sm font-bold">ID: {returnRequest.distributor.distributor_id}</p>
            </div>
            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
                <h1 className="font-bold">Items to Return:</h1>
                {returnRequest.items.map(item => (
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
                            <div className="flex mt-3 gap-3">
                            {item.status === 'pending' && hasPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) &&
                                <>
                                    <button 
                                        className="text-sm bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                                        onClick={() => handleUpdateItem('rejected', item.variant_id)}
                                    >Reject</button>
                                    <button 
                                        className="text-sm text-inverse bg-gold px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                                        onClick={() => handleUpdateItem('accepted', item.variant_id)}
                                    >Accept</button>
                                </>
                            }
                            {item.status === 'delivered' && hasPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) && (
                                <>
                                <button 
                                    className="text-sm text-inverse bg-gold px-2 py-1 rounded-md cursor-pointer hover:opacity-70"
                                    onClick={() => handleUpdateItem('received', item.variant_id)}
                                >Mark as Received</button>
                                </>
                            )}
                            </div> 
                        </div>
                        <div className="self-start">
                            <ReturnRequestStatusChip status={item.status} />
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs md:text-sm">Date Requested: {formatDate(returnRequest?.createdAt)}</p>
            <div className="space-y-2">
                <h1 className="font-bold text-sm">Reason:</h1>
                <p className="text-break-all px-2 py-3 bg-black/10 max-h-20 overflow-y-auto">{returnRequest.reason}</p>
            </div>
            <div className="flex justify-end gap-3">
            {hasPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) && returnRequest.items.some(item => item.status === 'pending') ? (
                <>
                <Button
                    className="md:px-4 lg:py-3 bg-red-600 text-white borde-none"
                    label="Reject All"   
                    onClick={() => handleUpdateItems('rejected')}  
                />
                <GoldButton 
                    className="text-sm"
                    onClick={() => handleUpdateItems('accepted')}
                >Accept All</GoldButton>
                </>
            ) : (
                <Button
                    className="md:px-4 lg:py-3"
                    label="Close"   
                    onClick={close}  
                />
            )}
            </div>
        </div>
    )
}