import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"
import DashboardDistributorMonthlySales from "../../components/dashboard/DistributorsMonthlySales";
import DashboardDistributorItemsSoldPerMonth from "../../components/dashboard/DistributorItemSoldPerMonth";

export default function Dashboard() {

    return (
        <PageContainer 
            title="Dashboard"
            description="Overview of your system metrics and activities."
        >
            <Metrics />

            <DashboardDistributorMonthlySales />
            <DashboardDistributorItemsSoldPerMonth />
        </PageContainer>
    );
}