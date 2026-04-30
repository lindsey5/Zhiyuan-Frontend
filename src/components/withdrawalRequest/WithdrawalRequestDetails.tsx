import { X } from "lucide-react";
import { useWithdrawalRequest } from "../../hooks/useWithdrawalRequest";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { useEffect, useState } from "react";
import type { WithdrawalRequest } from "../../types/withdrawalRequest.type";
import { formatDate, formatToPeso } from "../../utils/utils";
import DeliveryStatusChip from "../shared/DeliveryStatusChip";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import { promiseToast } from "../../utils/sileo";

interface WithdrawalRequestDetailsProps {
    withdrawal_id: string | null;
    close: () => void;
}

function WithdrawalRequestDetailsSkeleton () {
    return (
        <>
            {/* Status + Date Skeleton */}
            <div className="flex flex-col items-start gap-3 mb-5 pb-5 border-b border-[var(--border-panel)]">
                <div className="w-full flex gap-3">
                    <div className="flex-1 h-6 rounded bg-loading"></div>
                    <div className="flex-1 h-6 rounded bg-loading"></div>
                </div>
                <div className="w-full h-5 rounded bg-loading"></div>
            </div>

            {/* Requested By Skeleton */}
            <div className="mb-5">
            <div className="w-32 h-4 rounded bg-loading mb-3"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="h-5 rounded bg-loading"></div>
                <div className="h-5 rounded bg-loading"></div>
                <div className="h-5 rounded bg-loading"></div>
            </div>
            </div>

            {/* Withdrawal Method Skeleton */}
            <div className="bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-lg p-4 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="h-5 rounded bg-loading"></div>
                <div className="h-5 rounded bg-loading"></div>
                <div className="h-5 rounded bg-loading"></div>
                <div className="h-5 rounded bg-loading"></div>
                <div className="h-5 rounded bg-loading"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-3 justify-end mt-5">
                <div className="w-20 h-9 rounded bg-loading"></div>
            </div>
        </>
    )
}

export default function WithdrawalRequestDetails({ withdrawal_id, close } : WithdrawalRequestDetailsProps) {
    const { getWithdrawalRequestById, updateWithdrawalRequestStatus } = useWithdrawalRequest();
    const { data, isFetching } = getWithdrawalRequestById(withdrawal_id || "");
    const [withdrawalRequest, setWithdrawalRequest] = useState<WithdrawalRequest | null>(null);

    const handleUpdate = async (status: string) => {
        if(!withdrawalRequest) return;
        const isConfirmed = confirm(`Are you sure you want to update the status to ${status}?`);

        if(!isConfirmed) return;

        const response = await promiseToast(updateWithdrawalRequestStatus.mutateAsync({
            status, 
            id: withdrawalRequest._id
        }), 'top-center', () => {});

        if(response.success){
            setWithdrawalRequest(response.withdrawalRequest);
        }
    }

    useEffect(() => {
        if(data?.withdrawalRequest) setWithdrawalRequest(data.withdrawalRequest)
    }, [data])

    return (
        <Modal
            open={withdrawal_id !== null}
            onClose={close}
        >
            <Card className="max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md md:text-lg font-bold">Withdrawal Request Details</h2>
                    <button
                        onClick={close}
                        className="cursor-pointer hover:opacity-50"
                    >
                        <X />
                    </button>
                </div>

                {isFetching ? <WithdrawalRequestDetailsSkeleton/> : (
                    <>
                        {/* Status + Date */}
                        <div className="flex flex-col items-start gap-3 mb-5 pb-5 border-b border-[var(--border-panel)]">
                            <div className="w-full flex gap-3 flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs">Status:</p>
                                    <DeliveryStatusChip status={withdrawalRequest?.status || ""} />
                                </div>
                                <Button label="Print Receipt" className="text-xs"/>
                            </div>
                            <div className="text-xs">
                                Requested on:{" "}
                                <span className="font-medium">
                                    {formatDate(withdrawalRequest?.createdAt || "")}
                                </span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <p className="text-xs uppercase tracking-widest mb-3">
                                Requested By
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-gray">Distributor Name</p>
                                    <p className="font-medium">
                                        {withdrawalRequest?.distributor.distributor_name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray">Distributor ID</p>
                                    <p className="font-medium">
                                        {withdrawalRequest?.distributor.distributor_id}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray">Email</p>
                                    <p className="font-medium">{withdrawalRequest?.distributor.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-lg p-4 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-xs text-gray">Withdrawal Method</p>
                                <p className="font-medium capitalize">
                                    {withdrawalRequest?.withdrawal_method.type}
                                </p>
                            </div>

                            {withdrawalRequest?.withdrawal_method.account_name && (
                                <div>
                                    <p className="text-xs text-gray">Account Name</p>
                                    <p className="font-medium capitalize">
                                        {withdrawalRequest?.withdrawal_method.account_name}
                                    </p>
                                </div>
                            )}

                            {withdrawalRequest?.withdrawal_method.account_number && (
                                <div>
                                    <p className="text-xs text-gray">Account Number</p>
                                    <p className="font-medium capitalize">
                                        {withdrawalRequest?.withdrawal_method.account_number}
                                    </p>
                                </div>
                            )}

                            {withdrawalRequest?.withdrawal_method.bank_name && (
                                <div>
                                    <p className="text-xs text-gray">Bank Name</p>
                                    <p className="font-medium capitalize">
                                        {withdrawalRequest?.withdrawal_method.bank_name}
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-xs text-gray">Amount</p>
                                <p className="font-medium capitalize font-semibold">
                                    {formatToPeso(withdrawalRequest?.amount || 0)}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-5">
                            <Button
                                label="Close"
                                onClick={close}
                            />

                            {withdrawalRequest?.status === "pending" && (
                                <>
                                    <Button
                                        className="bg-red-600 text-white border-none"
                                        onClick={() => handleUpdate("rejected")}
                                        label="Reject"
                                    />
                                    <GoldButton
                                        onClick={() => handleUpdate("approved")}
                                        className="text-sm"
                                    >
                                        Approve
                                    </GoldButton>
                                </>
                            )}

                            {withdrawalRequest?.status === "approved" && (
                                <>
                                    <Button
                                        className="bg-red-600 text-white border-none"
                                        onClick={() => handleUpdate("cancelled")}
                                        label="Cancel"
                                    />
                                    <GoldButton
                                        onClick={() => handleUpdate("completed")}
                                        className="text-sm"
                                    >
                                        Mark as Completed
                                    </GoldButton>
                                </>
                            )}
                        </div>
                    </>
                )}
            </Card>
        </Modal>
    )
}