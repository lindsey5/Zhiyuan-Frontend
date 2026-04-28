import AllDistributorItemsSoldPerMonth from "../../components/reports/AllDistributorItemSoldPerMonth";
import AllDistributorMonthlySales from "../../components/reports/AllDistributorMonthlySales";
import DistributorMostSellingProducts from "../../components/reports/DistributorMostSellingProducts";
import { AllDistributorItemsSoldThisMonth, AllDistributorItemsSoldThisWeek, AllDistributorItemsSoldThisYear, AllDistributorItemsSoldToday, AllDistributorSalesThisMonth, AllDistributorSalesThisWeek, AllDistributorSalesThisYear, AllDistributorSalesToday } from "../../components/reports/ReportStatCards";
import PageContainer from "../../components/ui/PageContainer";

export default function DistributorReports () {
    return (
        <PageContainer
            title="Distributors Report"
            description="View distributors overall reports and analytics"
        >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                <AllDistributorSalesToday />
                <AllDistributorSalesThisWeek />
                <AllDistributorSalesThisMonth  />
                <AllDistributorSalesThisYear />
                <AllDistributorItemsSoldToday />
                <AllDistributorItemsSoldThisWeek />
                <AllDistributorItemsSoldThisMonth />
                <AllDistributorItemsSoldThisYear />
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-5">
                <AllDistributorMonthlySales />
                <DistributorMostSellingProducts className="max-w-xl"/>
            </div>
            <AllDistributorItemsSoldPerMonth />
        </PageContainer>
    )
}