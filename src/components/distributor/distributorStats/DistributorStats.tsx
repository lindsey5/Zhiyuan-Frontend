import DistributorCommissionsPerMonth from "./DistributorCommissionsPerMonth";
import DistributorItemsSoldPerMonth from "./DistributorItemSoldPerMonth";
import DistributorMonthlySales from "./DistributorMonthlySales";
import { DistributorItemsSoldThisMonth, DistributorItemsSoldThisWeek, DistributorItemsSoldThisYear, DistributorItemsSoldToday, DistributorSalesThisMonth, DistributorSalesThisWeek, DistributorSalesThisYear, DistributorSalesToday, DistributorTotalStocks } from "./StatCards";

export default function DistributorStats ({ distributorId } : { distributorId : string}) {
    return (
        <div className="space-y-3 md:space-y-5">
           <div className="flex flex-col gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                <DistributorSalesToday id={distributorId} />
                <DistributorSalesThisWeek id={distributorId} />
                <DistributorSalesThisMonth id={distributorId} />
                <DistributorSalesThisYear id={distributorId} />
                <DistributorItemsSoldToday id={distributorId} />
                <DistributorItemsSoldThisWeek id={distributorId} />
                <DistributorItemsSoldThisMonth id={distributorId} />
                <DistributorItemsSoldThisYear id={distributorId} />
                <DistributorTotalStocks id={distributorId} />
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
                <DistributorMonthlySales id={distributorId} />
                <DistributorItemsSoldPerMonth id={distributorId} />
            </div>
            <DistributorCommissionsPerMonth id={distributorId} />
        </div>
    )
}