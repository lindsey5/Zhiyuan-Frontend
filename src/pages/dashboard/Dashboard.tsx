import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"
import DashboardDistributorMonthlySales from "../../components/dashboard/DistributorMonthlySales";
import DashboardDistributorItemsSoldPerMonth from "../../components/dashboard/DistributorItemSoldPerMonth";
import OrdersMonthlySales from "../../components/orderSales/OrdersMonthlySales";
import BestSellingProducts from "../../components/orderSales/BestSellingProducts";
import DistributorBestSellingProducts from "../../components/reports/DistributorBestSellingProducts";

export default function Dashboard() {

    return (
        <PageContainer 
            title="Dashboard"
            description="Overview of your system metrics and activities."
        >
            <Metrics />
            <OrdersMonthlySales />
            <div className="w-full flex flex-col lg:flex-row gap-5">
                <BestSellingProducts />
                <DistributorBestSellingProducts />
            </div>
            <DashboardDistributorMonthlySales />
            <DashboardDistributorItemsSoldPerMonth />
        </PageContainer>
    );
}