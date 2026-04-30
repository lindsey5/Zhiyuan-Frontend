import { useDistributor } from "../../hooks/useDistributor"
import { useProduct } from "../../hooks/useProduct";
import { useUser } from "../../hooks/useUser";
import MetricCard, { MetricCardSkeleton } from "../shared/MetricCard";

export const TotalProducts = () => {
    const { getTotalProducts } = useProduct();
    const { data, isFetching } = getTotalProducts();

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Total Products"
            content={data?.totalProducts.toString() || ""}
            onClick={() => window.location.href = '/dashboard/products'}
        />
    )
}

export const LowStockProducts = () => {
    const { getTotalLowStockProducts } = useProduct();
    const { data, isFetching } = getTotalLowStockProducts();

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Low Stock Products"
            content={data?.totalLowStockProducts.toString() || ""}
            onClick={() => window.location.href = '/dashboard/products/low-stocks'}
        />
    )
}

export const TotalUsers = () => {
    const { getTotalUsers } = useUser();
    const { data, isFetching } = getTotalUsers();

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Total Users"
            content={data?.totalUsers.toString() || ""}
            onClick={() => window.location.href = '/dashboard/users'}
        />
    )
}

export const TotalDistributors = () => {
    const { getTotalDistributors } = useDistributor();
    const { data, isFetching } = getTotalDistributors();

    if(isFetching) return <MetricCardSkeleton />

    return (
        <MetricCard 
            title="Total Distributors"
            content={data?.totalDistributors.toString() || ""}
            onClick={() => window.location.href = '/dashboard/distributors'}
        />
    )
}