import PageContainer from "../../components/ui/PageContainer"
import OrdersMonthlySales from "../../components/orderSales/OrdersMonthlySales";
import OrderMetrics from "../../components/orderSales/OrderMetrics";
import BestSellingProducts from "../../components/orderSales/BestSellingProducts";

export default function OrderSales() {

    return (
        <PageContainer 
            title="Walk-in Order Sales"
            description="View monthly sales performance and revenue analytics from walk-in orders."
        >
            <OrderMetrics />
            <div className="w-full flex flex-col lg:flex-row gap-5">
                <OrdersMonthlySales />
                <BestSellingProducts className="min-w-xl max-w-xl"/>
            </div>
        </PageContainer>
    );
}