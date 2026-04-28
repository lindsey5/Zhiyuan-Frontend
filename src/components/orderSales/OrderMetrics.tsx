import { OrderSalesThisMonth, OrderSalesThisWeek, OrderSalesThisYear, OrderSalesToday } from "./OrderMetricCards";

export default function OrderMetrics () {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <OrderSalesToday />
            <OrderSalesThisWeek />
            <OrderSalesThisMonth />
            <OrderSalesThisYear />
        </div>
    )
}