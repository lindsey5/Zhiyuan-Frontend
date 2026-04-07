import Card from "./Card";

interface MetricCardProps {
    title: string;
    content: string;
}

export default function MetricCard({ title, content }: MetricCardProps) {
    return (
        <Card>
            <div className="flex flex-col gap-2">
                <span className="font-sans text-gold text-md font-bold">{title}</span>
                <h1 className="font-sans text-primary text-lg lg:text-2xl">
                    {content}
                </h1>
            </div>
        </Card>
    );
}

export function MetricCardSkeleton() {
    return (
        <Card>
            <div className="flex flex-col gap-5">
                <div className="w-full h-5 bg-loading animate-pulse"></div>
                <div className="w-full h-5 bg-loading animate-pulse"></div>
            </div>
        </Card>
    )
}