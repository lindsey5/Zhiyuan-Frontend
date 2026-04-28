import { useDistributorSale } from "../../hooks/useDistributorSale";
import { cn, formatToPeso } from "../../utils/utils";
import Card from "../ui/Card";
import Chip from "../ui/Chip";

export default function DistributorMostSellingProducts({ className } : { className?: string }) {
    const { getDistributorMostSellingProducts } = useDistributorSale();
    const { data, isFetching } = getDistributorMostSellingProducts();

    return (
        <Card className={cn(
            "flex-1 flex flex-col space-y-3 max-h-[300px] md:max-h-[500px]",
            className
        )}>
            <h1 className="font-bold text-gold">Distributors Most Selling Products</h1>

            {/* Skeleton Loading */}
            {isFetching && (
                <div className="space-y-4 mt-4 overflow-y-auto min-h-0 flex-grow">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex gap-4 items-start animate-pulse">
                            <div className="w-20 h-20 rounded-lg bg-loading border border-[var(--border-panel)]" />

                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-[70%] bg-loading rounded-md" />
                                <div className="h-6 w-24 bg-loading rounded-full" />

                                <div className="flex flex-col md:flex-row flex-wrap md:gap-6 gap-2">
                                    <div className="h-3 w-24 bg-loading rounded-md" />
                                    <div className="h-3 w-32 bg-loading rounded-md" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="overflow-y-auto min-h-0 flex-grow">
            {/* Data */}
            {!isFetching &&
                data?.mostSellingProducts.map((product) => (
                    <div
                        key={product.variant._id}
                        className="flex gap-4 items-start mt-4"
                    >
                        <img
                            className="w-20 h-20 rounded-lg object-cover border border-[var(--border-panel)] shadow-sm"
                            src={product.variant.image_url}
                            alt={product.variant.variant_name}
                        />

                        <div className="flex-1 space-y-2">
                            <div>
                                <h2 className="text-sm font-semibold leading-snug">
                                    {product.variant.product.product_name}
                                </h2>

                                <div className="mt-1">
                                    <Chip>{product.variant.variant_name}</Chip>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row flex-wrap md:gap-6 text-sm text-muted">
                                <p>Total Sold: {product.totalSold}</p>
                                <p>Total Revenue: {formatToPeso(product.totalRevenue)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}