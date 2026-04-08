import AllDistributorItemsSoldPerMonth from "../../components/reports/AllDistributorItemSoldPerMonth";
import AllDistributorMonthlySales from "../../components/reports/AllDistributorMonthlySales";
import { AllDistributorItemsSoldThisMonth, AllDistributorItemsSoldThisWeek, AllDistributorItemsSoldThisYear, AllDistributorItemsSoldToday, AllDistributorSalesThisMonth, AllDistributorSalesThisWeek, AllDistributorSalesThisYear, AllDistributorSalesToday } from "../../components/reports/ReportStatCards";
import { ChartSkeleton } from "../../components/ui/Chart";
import PageContainer from "../../components/ui/PageContainer";

export default function DistributorReports () {
    return (
        <PageContainer
            title="Distributors Reports"
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
            <AllDistributorMonthlySales />
            <AllDistributorItemsSoldPerMonth />
        </PageContainer>
    )
}