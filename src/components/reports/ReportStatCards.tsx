import { useDistributorSale } from "../../hooks/useDistributorSale";
import { formatToPeso } from "../../utils/utils";
import MetricCard, { MetricCardSkeleton } from "../ui/MetricCard";

export const AllDistributorSalesToday = () => {
    const { getAllDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorSalesByPeriod("today");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales Today"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const AllDistributorSalesThisWeek = () => {
    const { getAllDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorSalesByPeriod("this-week");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Week"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const AllDistributorSalesThisMonth = () => {
    const { getAllDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorSalesByPeriod("this-month");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Month"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const AllDistributorSalesThisYear = () => {
    const { getAllDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorSalesByPeriod("this-year");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Year"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const AllDistributorItemsSoldToday = () => {
    const { getAllDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorItemsSoldByPeriod("today");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Items Sold Today"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}

export const AllDistributorItemsSoldThisWeek = () => {
    const { getAllDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorItemsSoldByPeriod("this-week");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Items Sold This Week"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}

export const AllDistributorItemsSoldThisMonth = () => {
    const { getAllDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorItemsSoldByPeriod("this-month");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
           title="Items Sold This Month"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}

export const AllDistributorItemsSoldThisYear = () => {
    const { getAllDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getAllDistributorItemsSoldByPeriod("this-year");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Items Sold This Year"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}