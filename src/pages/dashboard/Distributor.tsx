import { useParams } from "react-router-dom";
import DistributorInfo from "../../components/distributor/DistributorInfo";
import DistributorInventory from "../../components/distributor/DistributorInventory";
import { useMemo, useState } from "react";
import Tabs from "../../components/ui/Tabs";
import { BarChartBig, FileBarChart, HandCoins, Network, Package } from "lucide-react";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import DistributorSales from "../../components/distributor/DistributorSales";
import DistributorStats from "../../components/distributor/distributorStats/DistributorStats";
import { cn } from "../../utils/utils";
import { useDebounce } from "../../hooks/useDebounce";
import DistributorCommissions from "../../components/distributor/DistributorCommissions/DistributorCommissions";
import DownlineDistributors from "../../components/distributor/DownlineDistributors";

export default function Distributor() {
    const params = useParams();
    const id = params.id;
    const { hasPermissions } = usePermissions();

    const defaultSelected = useMemo(() => {
        if (hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW])) return "Inventory";
        if (hasPermissions([PERMISSIONS.DISTRIBUTOR_SALES_VIEW])) return "Sales";
        if (hasPermissions([PERMISSIONS.DISTRIBUTOR_STATS_VIEW])) return "Stats";
        if (hasPermissions([PERMISSIONS.DISTRIBUTOR_COMMISSIONS_VIEW])) return "Commissions";
        return "";
    }, [hasPermissions]);

    const [selected, setSelected] = useState(defaultSelected);
    const debouncedSelected = useDebounce(selected, 800);

    const tabs = [
        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW])
        ? [{
            label: "Inventory",
            icon: <Package size={20} />,
            onClick: () => setSelected("Inventory"),
            }]
        : []),

        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_SALES_VIEW])
        ? [{
            label: "Sales",
            icon: <BarChartBig size={20} />,
            onClick: () => setSelected("Sales"),
            }]
        : []),

        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_STATS_VIEW])
        ? [{
            label: "Stats",
            icon: <FileBarChart size={20} />,
            onClick: () => setSelected("Stats"),
            }]
        : []),

        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_COMMISSIONS_VIEW])
        ? [{
            label: "Commissions",
            icon: <HandCoins size={20} />,
            onClick: () => setSelected("Commissions"),
            }]
        : []),

        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_DOWNLINE_VIEW])
        ? [{
            label: "Downline Distributors",
            icon: <Network size={20} />,
            onClick: () => setSelected("Downline Distributors"),
            }]
        : []),
    ];

    return (
        <div className={cn("flex flex-col gap-3 p-2 lg:p-6")}>
        <DistributorInfo id={id || ""} />

        <Tabs
            className="overflow-x-auto"
            items={tabs}
            defaultActive={tabs.findIndex(tab => tab.label === defaultSelected)}
        />

        {debouncedSelected === "Inventory" && (
            <DistributorInventory distributorId={id || ""} />
        )}
        {debouncedSelected === "Sales" && (
            <DistributorSales distributorId={id || ""} />
        )}
        {debouncedSelected === "Stats" && (
            <DistributorStats distributorId={id || ""} />
        )}
        {debouncedSelected === "Commissions" && (
            <DistributorCommissions distributorId={id || ""} />
        )}
        {debouncedSelected === 'Downline Distributors' && (
            <DownlineDistributors distributorId={id || ""} />
        )}
        </div>
    );
}