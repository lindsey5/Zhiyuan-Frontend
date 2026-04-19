import { X } from "lucide-react";
import type { SaleNotification } from "../../types/userNotification.type";
import { formatDate, formatToPeso } from "../../utils/utils";
import { useMemo } from "react";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

export default function SaleDetails ({ saleNotification, close } : { saleNotification: SaleNotification, close: () => void}) {
    const totalSales = useMemo(() => {
        return saleNotification.sales.reduce((total, sale) => sale.total_amount + total, 0)
    }, [saleNotification])

    const sellerCommissions = useMemo(() => {
        return totalSales * 0.05
    }, [totalSales])

    const parentDistributorCommissions = useMemo(() => {
        return totalSales * 0.02
    }, [totalSales])

    return (
        <div className="space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-md md:text-lg font-bold">Sale Details</h2>
                <button
                    onClick={close}
                    className="cursor-pointer hover:opacity-50"
                >
                    <X />
                </button>
            </div>
            <div className="border-y border-[var(--border-panel)] py-4">
                <h1 className="font-bold">Seller:</h1>
                <p className="text-xs md:text-sm">{saleNotification.sold_by.distributor_name}</p>
                <p className="text-xs md:text-sm text-gray">{saleNotification.sold_by.email}</p>
                <p className="text-xs md:text-sm font-bold">ID: {saleNotification.sold_by.distributor_id}</p>
            </div>
            <div className="space-y-3 max-h-[40vh] overflow-y-auto">
                <p className="font-bold text-sm md:text-base">Sold Items:</p>
                {saleNotification.sales.map(sale => (
                    <div
                        key={sale._id}
                        className="flex items-center gap-3 border-b border-[var(--border-panel)] py-3"
                    >
                        <img
                            src={sale.variant.image_url}
                            alt={sale.variant.variant_name}
                            className="w-14 h-14 object-cover rounded"
                        />

                        <div className="flex-1">
                            <p className="font-bold text-sm mb-2">
                                {sale.variant.product.product_name}
                            </p>
                            <Chip>{sale.variant.variant_name}</Chip>
                            <p className="font-medium text-xs md:text-sm mt-3">Quantity: {sale.quantity}</p>
                            <p className="font-bold text-xs md:text-sm mt-1">Sales: {formatToPeso(sale.total_amount)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="space-y-1">
                <p className="text-xs md:text-sm">Date: {formatDate(saleNotification?.createdAt)}</p>
                <p className="font-bold text-sm md:text-base">Total Sales: {formatToPeso(totalSales)}</p>
            </div>
            <div className="space-y-5">
                <h1 className="font-bold text-sm md:text-md">Commissions</h1>
                <div className="flex justify-between items-center border border-[var(--border-ui)] px-3 py-2 rounded-lg">
                <div className="space-y-1">
                    <h2 className="font-semibold text-sm">Seller:</h2>
                    <p className="text-sm">{saleNotification.sold_by.distributor_name || "N/A"}</p>
                    <p className="text-xs text-muted">{saleNotification.sold_by.email || ""}</p>
                    <p className="text-xs font-bold">ID: {saleNotification.sold_by.distributor_id}</p>
                </div>
                <p className="font-bold">{formatToPeso(sellerCommissions)}</p>
                </div>
                {saleNotification.sold_by.parent_distributor && (
                <div className="flex justify-between items-center border border-[var(--border-ui)] px-3 py-2 rounded-lg">
                    <div className="space-y-1">
                        <h2 className="font-semibold text-sm">Parent Distributor:</h2>
                        <p className="text-sm">{saleNotification.sold_by.parent_distributor?.distributor_name || "N/A"}</p>
                        <p className="text-xs text-muted">{saleNotification.sold_by.parent_distributor?.email || ""}</p>
                        <p className="text-xs font-bold">ID: {saleNotification.sold_by.parent_distributor?.distributor_id}</p>
                    </div>
                    <p className="font-bold">{formatToPeso(parentDistributorCommissions)}</p>
                </div>
                )}
            </div>
            <div className="flex justify-end">
                <Button
                    className="md:px-4 lg:py-3"
                    label="Close"   
                    onClick={close}  
                />
            </div>
        </div>
    )
}