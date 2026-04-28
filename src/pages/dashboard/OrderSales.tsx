import PageContainer from "../../components/ui/PageContainer"
import OrdersMonthlySales from "../../components/orderSales/OrdersMonthlySales";
import OrderMetrics from "../../components/orderSales/OrderMetrics";

export default function OrderSales() {

    return (
        <PageContainer 
            title="Walk-in Order Sales"
            description="View monthly sales performance and revenue analytics from completed walk-in orders."
        >
            <OrderMetrics />
            <OrdersMonthlySales />
        </PageContainer>
    );
}