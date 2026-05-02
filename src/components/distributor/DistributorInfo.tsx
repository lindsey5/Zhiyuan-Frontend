import { User } from "lucide-react";
import Card from "../ui/Card";
import { useDistributor } from "../../hooks/useDistributor";
import { formatToPeso } from "../../utils/utils";

export default function DistributorInfo ({ id } : { id : string }) {
    const { getDistributorById } = useDistributor();
    const { data : distributorData, isFetching } = getDistributorById(id || "");
    
    if(isFetching) return <DistributorInfoSkeleton />
    
    return (
        <div className="flex flex-col md:flex-row gap-3 lg:gap-5">
            <Card className="flex-1 px-3 py-4 space-y-3">
                <div className="flex items-start gap-5">
                    <div className="w-15 h-15 md:w-18 md:h-18 bg-gold rounded-full p-5">
                        <User className="w-full h-full text-inverse"/>
                    </div>
                    <div className="text-sm lg:text-md space-y-1">
                        <p className="font-semibold">
                            {distributorData?.distributor.distributor_name}
                        </p>

                        <p className="break-words">
                            ID: {distributorData?.distributor.distributor_id}
                        </p>

                        <p className="break-words">
                            Email: {distributorData?.distributor.email}
                        </p>
                    </div>
                </div>
                <div className="pt-3 border-t border-[var(--border-panel)] text-sm lg:text-md space-y-1">
                    <p className="break-words">
                        Wallet Balance: 
                        <span className="font-bold">{formatToPeso(distributorData?.distributor.wallet_balance || 0)}</span>
                    </p>
                    <p className="text-gray">
                        <span className="font-medium">Commission Rate:</span>{" "}
                        {distributorData?.distributor.commission_rate}%
                    </p>

                    <p className="text-gray">
                        <span className="font-medium">Commission from Downline Distributor:</span>{" "}
                        {distributorData?.distributor.child_commission_rate}%
                    </p>
                </div>
            </Card>
        </div>
    )
}

function DistributorInfoSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-3 lg:gap-5">
            <Card className="flex-1 px-3 py-4 space-y-4">
                
                {/* Top Info Skeleton */}
                <div className="flex items-start gap-5">
                    <div className="w-15 h-15 md:w-18 md:h-18 bg-loading rounded-full animate-pulse" />

                    <div className="flex flex-col gap-2 flex-1 animate-pulse">
                        <div className="h-4 w-40 bg-loading rounded" /> {/* Name */}
                        <div className="h-3 w-32 bg-loading rounded" /> {/* ID */}
                        <div className="h-3 w-52 bg-loading rounded" /> {/* Email */}
                    </div>
                </div>

                {/* Bottom Info Skeleton */}
                <div className="pt-3 border-t border-[var(--border-panel)] space-y-2 animate-pulse">
                    <div className="h-3 w-48 bg-loading rounded" /> {/* Wallet */}
                    <div className="h-3 w-40 bg-loading rounded" /> {/* Commission */}
                    <div className="h-3 w-56 bg-loading rounded" /> {/* Downline */}
                </div>
            </Card>
        </div>
    );
}