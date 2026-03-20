import MetricCard from "./MetricCard";

export default function Metrics () {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <MetricCard 
                title="Sales Today"
                content="P 100000"
            />
            <MetricCard 
                title="Sales Today"
                content="P 100000"
            />
            <MetricCard 
                title="Sales Today"
                content="P 100000"
            />
            <MetricCard 
                title="Sales Today"
                content="P 100000"
            />
        </div>
    )
}