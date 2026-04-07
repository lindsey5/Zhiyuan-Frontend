import { useDistributorSale } from "../../../hooks/useDistributorSale";
import { useDistributorStock } from "../../../hooks/useDistributorStock"
import { formatToPeso } from "../../../utils/utils";
import MetricCard, { MetricCardSkeleton } from "../../ui/MetricCard";

export const DistributorTotalStocks = ({ id } : { id: string}) => {
    const { getDistributorTotalStocks } = useDistributorStock();
    const { data, isFetching } = getDistributorTotalStocks(id);

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Total Stocks"
            content={data?.totalStocks.toString() || "0"}
        />
    )
}

export const DistributorSalesToday = ({ id } : { id: string }) => {
    const { getDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorSalesByPeriod(id, "today");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales Today"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const DistributorSalesThisWeek = ({ id } : { id: string }) => {
    const { getDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorSalesByPeriod(id, "this-week");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Week"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const DistributorSalesThisMonth = ({ id } : { id: string }) => {
    const { getDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorSalesByPeriod(id, "this-month");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Month"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const DistributorSalesThisYear = ({ id } : { id: string }) => {
    const { getDistributorSalesByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorSalesByPeriod(id, "this-year");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Sales This Year"
            content={formatToPeso(data?.sales || 0)}
        />
    )
}

export const DistributorItemsSoldToday = ({ id } : { id: string }) => {
    const { getDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorItemsSoldByPeriod(id, "today");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Items Sold Today"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}

export const DistributorItemsSoldThisWeek = ({ id } : { id: string }) => {
    const { getDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorItemsSoldByPeriod(id, "this-week");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Items Sold This Week"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}

export const DistributorItemsSoldThisMonth = ({ id } : { id: string }) => {
    const { getDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorItemsSoldByPeriod(id, "this-month");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
           title="Items Sold This Month"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}

export const DistributorItemsSoldThisYear = ({ id } : { id: string }) => {
    const { getDistributorItemsSoldByPeriod } = useDistributorSale();
    const { data, isFetching } = getDistributorItemsSoldByPeriod(id, "this-year");

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Items Sold This Year"
            content={data?.totalQuantity.toString() || "0"}
        />
    )
}