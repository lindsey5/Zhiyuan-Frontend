import DashboardChart from "../../components/dashboard/DashboardChart"
import Metrics from "../../components/dashboard/Metrics"
import Card from "../../components/ui/Card"
import { PERMISSIONS } from "../../config/permission"
import usePermissions from "../../hooks/usePermissions"
import { useRole } from "../../hooks/useRole"
import { Lock } from "lucide-react";

export default function Dashboard() {
    const { getOwnPermissions } = useRole();
    const permissions = getOwnPermissions().data?.permissions || [];
    const { hasPermissions } = usePermissions();

    const isAuthorized = hasPermissions(
        [PERMISSIONS.DASHBOARD_VIEW],
        permissions
    );

    return (
        <div className="w-full p-10">
        <div className={isAuthorized ? "" : "blur-md pointer-events-none select-none"}>
            <div className="flex flex-col space-y-5">
                <Card>
                    <h1 className="font-sans text-gold font-bold text-2xl">
                    Dashboard
                    </h1>
                </Card>

                <Metrics />

                <DashboardChart
                    title="Monthly Sales"
                    labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
                    values={[30, 50, 40, 70, 60]}
                />
            </div>
        </div>

        {!isAuthorized && (
            <div className="absolute inset-0 flex items-center justify-center">
                <Card className="p-10 flex flex-col items-center gap-4 shadow-xl">
                    <Lock size={60} className="text-gold" />

                    <h1 className="text-xl font-bold text-primary">
                    Access Restricted
                    </h1>

                    <p className="text-gray-400 text-center">
                    You don’t have permission to view this content.
                    </p>
                </Card>
            </div>
        )}
        </div>
    );
}