import { useState } from "react";
import { useDistributorSale } from "../../hooks/useDistributorSale";
import Chart from "../ui/Chart";
import Dropdown from "../ui/Dropdown";
import { yearOptions } from "../../lib/contants/contants";

export default function AllDistributorMonthlySales () {
    const { getAllDistributorMonthlySales } = useDistributorSale();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<string>(currentYear.toString());

    const { data } = getAllDistributorMonthlySales(Number(year));

    return (
        <div className="relative">
            <Dropdown
                className="absolute right-5 top-5"
                options={yearOptions}
                value={year}
                onChange={setYear}
            />
        <Chart 
            labels={data?.monthlySales.map(sale => sale.month) || []}
            title="Monthly Sales"
            values={data?.monthlySales.map(sale => sale.totalSales) || []}
        />
        </div>
    )
}