import { useParams } from "react-router-dom";
import DistributorInfo from "../../components/distributors/DistributorInfo";
import DistributorInventory from "../../components/distributor/DistributorInventory";
import { useState } from "react";
import Tabs from "../../components/ui/Tabs";
import { BarChartBig, Package } from "lucide-react";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import DistributorSales from "../../components/distributor/DistributorSales";

export default function Distributor () {
    const params = useParams();
    const id = params.id;
    const { getOwnRole } = useRole();
    const { data } = getOwnRole();
    const permissions = data?.permissions || [];
    const { hasPermissions } = usePermissions();
    const [selected, setSelected] = useState(hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW] ,permissions) ? "Inventory" : "Sales");

    return (
        <div className="flex flex-col gap-3 p-2 lg:p-6 md:max-h-screen">
            <DistributorInfo id={id || ""} />
                <Tabs
                    items={[
                        // Inventory tab (conditionally)
                        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW], permissions)
                        ? [{
                            label: "Inventory",
                            icon: <Package size={20} />,
                            onClick: () => setSelected("Inventory"),
                            }]
                        : []),

                        // Sales tab (conditionally)
                        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_SALES_VIEW], permissions)
                        ? [{
                            label: "Sales",
                            icon: <BarChartBig size={20} />,
                            onClick: () => setSelected("Sales"),
                            }]
                        : []),
                    ]}
                    defaultActive={hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_VIEW] ,permissions) ? 0 : 1}
                />
                {selected === "Inventory" && (
                    <DistributorInventory distributorId={id || ""}/>
                )}
                {selected === "Sales" && (
                    <DistributorSales />
                )}
        </div>
    )
}