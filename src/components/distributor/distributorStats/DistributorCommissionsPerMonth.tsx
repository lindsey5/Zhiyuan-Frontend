import { useState } from "react";
import Chart, { ChartSkeleton } from "../../ui/Chart";
import Dropdown from "../../ui/Dropdown";
import { yearOptions } from "../../../lib/contants/contants";
import { useCommissionLog } from "../../../hooks/useCommissionLog";

export default function DistributorCommissionsPerMonth ({ id } : { id: string }) {
    const { getCommissionsPerMonth } = useCommissionLog();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<string>(currentYear.toString());

    const { data, isFetching } = getCommissionsPerMonth(id, Number(year));
    
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
                labels={data?.commissionsPerMonth.map(sale => sale.month) || []}
                title="Commissions Per Month"
                values={data?.commissionsPerMonth.map(sale => sale.totalCommission) || []}
            />
        </div>
    )
}