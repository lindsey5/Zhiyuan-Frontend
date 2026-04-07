import DistributorItemsSoldPerMonth from "./DistributorItemSoldPerMonth";
import DistributorMonthlySales from "./DistributorMonthlySales";
import { DistributorItemsSoldThisMonth, DistributorItemsSoldThisWeek, DistributorItemsSoldThisYear, DistributorItemsSoldToday, DistributorSalesThisMonth, DistributorSalesThisWeek, DistributorSalesThisYear, DistributorSalesToday, DistributorTotalStocks } from "./StatCards";

export default function DistributorStats ({ distributorId } : { distributorId : string}) {
    return (
        <div className="space-y-3 md:space-y-5">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
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
            <DistributorMonthlySales id={distributorId} />
            <DistributorItemsSoldPerMonth id={distributorId} />
        </div>
    )
}