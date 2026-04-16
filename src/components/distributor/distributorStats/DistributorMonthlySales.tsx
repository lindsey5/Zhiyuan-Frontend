import { useState } from "react";
import { useDistributorSale } from "../../../hooks/useDistributorSale";
import Chart, { ChartSkeleton } from "../../ui/Chart";
import { yearOptions } from "../../../lib/contants/contants";
import Dropdown from "../../ui/Dropdown";

export default function DistributorMonthlySales ({ id } : { id: string }) {
    const { getDistributorMonthlySales } = useDistributorSale();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<string>(currentYear.toString());
    const { data, isFetching } = getDistributorMonthlySales(id, Number(year));

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
                formatToPeso
                labels={data?.monthlySales.map(sale => sale.month) || []}
                title="Monthly Sales"
                values={data?.monthlySales.map(sale => sale.totalSales) || []}
            />
        </div>
    )
}