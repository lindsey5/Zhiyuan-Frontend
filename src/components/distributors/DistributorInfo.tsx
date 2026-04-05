import { User, Wallet } from "lucide-react";
import Card from "../ui/Card";
import { useDistributor } from "../../hooks/useDistributor";
import { formatToPeso } from "../../utils/utils";


export default function DistributorInfo ({ id, showBalance = true } : { id : string, showBalance?: boolean }) {
    const { getDistributorById } = useDistributor();
    const { data : distributorData, isFetching } = getDistributorById(id || "");
    
    if(isFetching) return <DistributorInfoSkeleton />
    
    return (
        <>
        <Card className="flex-1 flex items-center gap-5">
            <div className="w-15 h-15 md:w-18 md:h-18 bg-gold rounded-full p-5">
                <User className="w-full h-full text-inverse"/>
            </div>
            <div className="text-sm lg:text-md break-all">
                <h1>{distributorData?.distributor.distributor_name}</h1>
                <h1 className="font-bold">{distributorData?.distributor.email}</h1>
            </div>
        </Card>

        {showBalance && <Card className="flex-1 flex items-center gap-5">
            <div className="w-15 h-15 md:w-18 md:h-18 bg-gold rounded-full p-5">
                <Wallet className="w-full h-full text-inverse"/>
            </div>
            <div className="text-sm lg:text-md break-all">
                <p className="mb-1">Wallet Balance</p>
                <p className="font-bold text-lg">{formatToPeso(distributorData?.distributor.wallet_balance || 0)}</p>
            </div>
        </Card>}
        </>
    )
}

function DistributorInfoSkeleton () {
    return (
        <>
        {/* Distributor Info Skeleton */}
        <Card className="flex items-center gap-5">
            <div className="w-20 h-20 bg-loading rounded-full animate-pulse" />

            <div className="flex flex-col gap-2 animate-pulse">
                <div className="h-3 w-32 bg-loading rounded" />
                <div className="h-5 w-48 bg-loading rounded" />
            </div>
        </Card>

        {/* Wallet Balance Skeleton */}
        <Card className="flex-1 flex items-center gap-5">
            <div className="w-20 h-20 bg-loading rounded-full animate-pulse" />

            <div className="flex flex-col gap-2 animate-pulse">
                <div className="h-3 w-32 bg-loading rounded" />
                <div className="h-5 w-48 bg-loading rounded" />
            </div>
        </Card>
        </>
    )
}