import { useState } from "react";
import { useDistributorSale } from "../../../hooks/useDistributorSale";
import Chart, { ChartSkeleton } from "../../ui/Chart";
import Dropdown from "../../ui/Dropdown";
import { yearOptions } from "../../../lib/contants/contants";

export default function DistributorItemsSoldPerMonth ({ id } : { id: string }) {
    const { getDistributorItemsSoldPerMonth } = useDistributorSale();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<string>(currentYear.toString());

    const { data, isFetching } = getDistributorItemsSoldPerMonth(id, Number(year));
    
    if(isFetching) return <ChartSkeleton />

    return (
        <div className="relative">
            <Dropdown
                className="absolute right-5 top-5"
                options={yearOptions}
                value={year}
                onChange={setYear}
            />
            <Chart 
                formatToPeso={false}
                labels={data?.itemsSoldPerMonth.map(sale => sale.month) || []}
                title="Items Sold Per Month"
                values={data?.itemsSoldPerMonth.map(sale => sale.totalQuantity) || []}
            />
        </div>
    )
}