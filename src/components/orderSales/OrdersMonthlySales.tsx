import { useState } from "react";
import Chart, { ChartSkeleton } from "../ui/Chart";
import Dropdown from "../ui/Dropdown";
import { yearOptions } from "../../lib/contants/contants";
import { useOrder } from "../../hooks/useOrder";

export default function OrdersMonthlySales () {
    const { getOrderMonthlySales } = useOrder();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<string>(currentYear.toString());

    const { data, isFetching } = getOrderMonthlySales(Number(year));
    
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
            title="Walk-in Order Monthly Sales"
            values={data?.monthlySales.map(sale => sale.totalSales) || []}
        />
        </div>
    )
}