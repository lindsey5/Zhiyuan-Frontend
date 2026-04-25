import { useNavigate, useParams } from "react-router-dom";
import DistributorInfo from "../../components/distributors/DistributorInfo";
import DistributorInventory from "../../components/distributor/DistributorInventory";
import { useState } from "react";
import Tabs from "../../components/ui/Tabs";
import { BarChartBig, FileBarChart, HandCoins, Package } from "lucide-react";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import DistributorSales from "../../components/distributor/DistributorSales";
import DistributorStats from "../../components/distributor/distributorStats/DistributorStats";
import { cn } from "../../utils/utils";
import { useDebounce } from "../../hooks/useDebounce";
import DistributorCommissions from "../../components/distributor/DistributorCommissions/DistributorCommissions";

export default function Distributor () {
    const params = useParams();
    const id = params.id;
    const { hasPermissions } = usePermissions();
    const [selected, setSelected] = useState(hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW]) ? "Inventory" : "Sales");
    const debouncedSelected = useDebounce(selected, 800);

    return (
        <div className={cn(
            "flex flex-col gap-3 p-2 lg:p-6",
        )}>
            <DistributorInfo id={id || ""} />
            <Tabs
                className="overflow-x-auto"
                items={[
                    // Inventory tab (conditionally)
                    ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW])
                    ? [{
                        label: "Inventory",
                        icon: <Package size={20} />,
                        onClick: () => setSelected("Inventory"),
                        }]
                    : []),

                    // Sales tab (conditionally)
                    ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_SALES_VIEW])
                    ? [{
                        label: "Sales",
                        icon: <BarChartBig size={20} />,
                        onClick: () => setSelected("Sales"),
                        }]
                    : []),

                    // Stats tab (conditionally)
                    ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_STATS_VIEW])
                    ? [{
                        label: "Stats",
                        icon: <FileBarChart size={20} />,
                        onClick: () => setSelected("Stats"),
                        }]
                    : []),

                    {
                    label: "Commissions",
                    icon: <HandCoins size={20} />,
                    onClick: () => setSelected("Commissions"),
                    }
                ]}
                defaultActive={hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW]) ? 0 : 1}
            />
            {debouncedSelected === "Inventory" && <DistributorInventory distributorId={id || ""}/>}
            {debouncedSelected === "Sales" && <DistributorSales distributorId={id || ""} />}
            {debouncedSelected === 'Stats' && <DistributorStats distributorId={id || ""} />}
            {debouncedSelected === "Commissions" && <DistributorCommissions distributorId={id || ""}/>}
        </div>
    )
}