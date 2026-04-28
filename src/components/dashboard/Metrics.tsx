import { LowStockProducts, TotalDistributors, TotalProducts, TotalUsers } from "./MetricCards";

export default function Metrics () {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <TotalProducts />
            <LowStockProducts />
            <TotalUsers />
            <TotalDistributors />
            
        </div>
    )
}