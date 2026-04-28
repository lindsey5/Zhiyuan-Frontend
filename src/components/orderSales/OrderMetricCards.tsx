import { useOrder } from "../../hooks/useOrder";
import { formatToPeso } from "../../utils/utils";
import MetricCard, { MetricCardSkeleton } from "../ui/MetricCard";

export const OrderSalesToday = () => {
    const { getOrderSalesByPeriod } = useOrder();
    const { data, isFetching } = getOrderSalesByPeriod("today");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales Today"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const OrderSalesThisWeek = () => {
    const { getOrderSalesByPeriod } = useOrder();
    const { data, isFetching } = getOrderSalesByPeriod("this-week");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Week"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const OrderSalesThisMonth = () => {
    const { getOrderSalesByPeriod } = useOrder();
    const { data, isFetching } = getOrderSalesByPeriod("this-month");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Month"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const OrderSalesThisYear = () => {
    const { getOrderSalesByPeriod } = useOrder();
    const { data, isFetching } = getOrderSalesByPeriod("this-year");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Year"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}