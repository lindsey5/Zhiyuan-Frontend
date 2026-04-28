import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"
import DashboardDistributorMonthlySales from "../../components/dashboard/DistributorsMonthlySales";
import DashboardDistributorItemsSoldPerMonth from "../../components/dashboard/DistributorItemSoldPerMonth";
import OrdersMonthlySales from "../../components/orderSales/OrdersMonthlySales";

export default function Dashboard() {

    return (
        <PageContainer 
            title="Walk-in Order Sales"
            description="View monthly sales performance and revenue analytics from walk-in orders."
        >
            <Metrics />
            <OrdersMonthlySales />
            
        </PageContainer>
    );
}