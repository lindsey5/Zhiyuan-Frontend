import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"
import DashboardDistributorMonthlySales from "../../components/dashboard/DistributorsMonthlySales";
import DashboardDistributorItemsSoldPerMonth from "../../components/dashboard/DistributorItemSoldPerMonth";
import OrdersMonthlySales from "../../components/orderSales/OrdersMonthlySales";
import MostSellingProducts from "../../components/orderSales/MostSellingProducts";
import DistributorMostSellingProducts from "../../components/reports/DistributorMostSellingProducts";

export default function Dashboard() {

    return (
        <PageContainer 
            title="Dashboard"
            description="Overview of your system metrics and activities."
        >
            <Metrics />
            <OrdersMonthlySales />
            <div className="w-full flex flex-col lg:flex-row gap-5">
                <MostSellingProducts />
                <DistributorMostSellingProducts />
            </div>
            <DashboardDistributorMonthlySales />
            <DashboardDistributorItemsSoldPerMonth />
        </PageContainer>
    );
}