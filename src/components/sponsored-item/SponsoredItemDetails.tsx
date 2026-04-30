import { X } from "lucide-react";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import { useSponsoredItem } from "../../hooks/useSponsoredItem";
import { formatDate } from "../../utils/utils";
import DeliveryStatusChip from "../shared/DeliveryStatusChip";
import Chip from "../ui/Chip";
import { promiseToast } from "../../utils/sileo";
import { useEffect, useState } from "react";
import type { SponsoredItem } from "../../types/sponsored-item.type";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";

interface SponsoredItemProps {
  sponsoredId: string | null;
  close: () => void;
}

export default function SponsoredItemDetails({ close, sponsoredId,}: SponsoredItemProps) {
    const { getSponsoredItemById, updateSponsoredItemStatus } = useSponsoredItem();
    const { data, isFetching } = getSponsoredItemById(sponsoredId || "");
    const [sponsoredItem, setSponsoredItem] = useState<SponsoredItem>();
    const { hasPermissions } = usePermissions();

    const handleUpdate = async (status: string) => {
        if (!sponsoredId) return;

        const isConfirmed = confirm(`Are you sure you want to update the status to ${status}?`);

        if (!isConfirmed) return;

        const data = await promiseToast(
            updateSponsoredItemStatus.mutateAsync({
                id: sponsoredId,
                status,
            }),
            "top-center",
            () => {}
        );

        if (data.success) {
            setSponsoredItem(data.sponsoredItem);
        }
    };

    useEffect(() => {
        if (data?.sponsoredItem) setSponsoredItem(data.sponsoredItem);
    }, [data]);

    return (
        <Modal onClose={close} open={sponsoredId !== null}>
        <Card>
            {/* Header */}
            <div className="flex justify-between items-start border-b border-[var(--border-panel)] pb-3 mb-4">
            <div>
                <h2 className="text-lg font-semibold tracking-wide">
                Sponsored Product Request
                </h2>
                <p className="text-xs text-gray mt-1">
                View complete details of the sponsored product request.
                </p>
            </div>

            <button
                onClick={close}
                className="p-2 rounded-full hover:bg-[var(--bg-panel)] transition cursor-pointer"
            >
                <X size={18} />
            </button>
            </div>

            {/* Skeleton Loading */}
            {isFetching ? (
            <div className="space-y-5">
                {/* Status + Date */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-14 rounded bg-loading animate-pulse" />
                        <div className="h-6 w-24 rounded bg-loading animate-pulse" />
                    </div>

                    <div className="h-4 w-52 rounded bg-loading animate-pulse" />
                </div>

                {/* Distributor Info Skeleton */}
                <div className="bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-lg p-4 mb-5 space-y-4">
                    <div className="h-4 w-44 rounded bg-loading animate-pulse" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <div className="h-3 w-24 rounded bg-loading animate-pulse" />
                            <div className="h-4 w-full rounded bg-loading animate-pulse" />
                        </div>

                        <div className="space-y-2">
                            <div className="h-3 w-24 rounded bg-loading animate-pulse" />
                            <div className="h-4 w-full rounded bg-loading animate-pulse" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <div className="h-3 w-14 rounded bg-loading animate-pulse" />
                            <div className="h-4 w-full rounded bg-loading animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="border border-[var(--border-panel)] rounded-lg p-4 space-y-4">
                    <div className="h-4 w-40 rounded bg-loading animate-pulse" />

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-20 h-20 rounded-lg bg-loading animate-pulse" />

                        <div className="flex-1 space-y-3">
                            <div className="h-4 w-3/4 rounded bg-loading animate-pulse" />
                            <div className="h-6 w-24 rounded bg-loading animate-pulse" />
                            <div className="h-4 w-32 rounded bg-loading animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
            ) : (
            <>
                {/* Status + Date */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2">
                        <p className="text-xs">Status:</p>
                        <DeliveryStatusChip status={sponsoredItem?.status || ""} />
                    </div>

                    <div className="text-xs">
                        Requested on:{" "}
                        <span className="font-medium">
                        {formatDate(sponsoredItem?.createdAt || "")}
                        </span>
                    </div>
                </div>

                {/* Distributor Info */}
                <div className="bg-[var(--bg-panel)] border border-[var(--border-panel)] rounded-lg p-4 mb-5">
                    <p className="text-xs uppercase tracking-widest mb-3">
                        Distributor Information
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-xs text-gray">Distributor Name</p>
                            <p className="font-medium">
                                {sponsoredItem?.distributor.distributor_name}
                            </p>
                            </div>

                        <div>
                            <p className="text-xs text-gray">Distributor ID</p>
                            <p className="font-medium">
                            {sponsoredItem?.distributor.distributor_id}
                        </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-xs text-gray">Email</p>
                            <p className="font-medium">{sponsoredItem?.distributor.email}</p>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="border border-[var(--border-panel)] rounded-lg p-4">
                    <p className="text-xs uppercase tracking-widest text-gray mb-3">
                        Sponsored Product
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-auto flex justify-center md:block">
                            <img
                                src={sponsoredItem?.variant.image_url}
                                alt={sponsoredItem?.variant.variant_name}
                                className="w-20 h-20 object-cover rounded-lg border border-[var(--border-panel)]"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <p className="font-semibold text-sm md:text-base">
                                {sponsoredItem?.variant.product.product_name}
                            </p>

                            <div className="flex items-center gap-2">
                                <Chip>{sponsoredItem?.variant.variant_name}</Chip>
                            </div>

                            <p className="text-sm text-gray">
                                Quantity:{" "}
                                <span className="font-semibold">
                                {sponsoredItem?.quantity}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 items-center justify-end mt-5">
                    <Button
                        label="Close"
                        disabled={updateSponsoredItemStatus.isPending}
                        onClick={close}
                    />

                    {hasPermissions([PERMISSIONS.SPONSORED_PRODUCT_UPDATE]) && (
                        <>
                        {sponsoredItem?.status === "pending" && (
                            <>
                            <Button
                                className="bg-red-600 text-white border-none"
                                onClick={() => handleUpdate("rejected")}
                                label="Reject"
                                disabled={updateSponsoredItemStatus.isPending}
                            />
                            <GoldButton
                                onClick={() => handleUpdate("approved")}
                                className="text-sm"
                                disabled={updateSponsoredItemStatus.isPending}
                            >
                                Approve
                            </GoldButton>
                            </>
                        )}

                        {sponsoredItem?.status === "approved" && (
                            <Button
                                className="bg-red-600 text-white border-none"
                                onClick={() => handleUpdate("cancelled")}
                                disabled={updateSponsoredItemStatus.isPending}
                                label="Cancel"
                            />
                        )}
                        </>
                    )}
                </div>
            </>
            )}
        </Card>
        </Modal>
    );
}