import Card from "../ui/Card";

interface MetricCardProps {
    title: string;
    content: string;
}

export default function MetricCard({ title, content }: MetricCardProps) {
    return (
        <Card>
            <div className="flex flex-col gap-2">
                <span className="font-sans text-gold text-md font-bold">{title}</span>
                <h1 className="font-sans text-primary text-2xl">
                    {content}
                </h1>
            </div>
        </Card>
    );
}