import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"
import DashboardDistributorMonthlySales from "../../components/dashboard/DistributorsMonthlySales";
import DashboardDistributorItemsSoldPerMonth from "../../components/dashboard/DistributorItemSoldPerMonth";
import OrdersMonthlySales from "../../components/orderSales/OrdersMonthlySales";

export default function Dashboard() {

    return (
        <PageContainer 
            title="Dashboard"
            description="Overview of your system metrics and activities."
        >
            <Metrics />
            <OrdersMonthlySales />
            <DashboardDistributorMonthlySales />
            <DashboardDistributorItemsSoldPerMonth />
        </PageContainer>
    );
}