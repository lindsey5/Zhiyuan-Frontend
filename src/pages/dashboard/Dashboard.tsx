import DashboardChart from "../../components/dashboard/DashboardChart"
import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"

export default function Dashboard() {

    return (
        <PageContainer title="Dashboard">
            <Metrics />

            <DashboardChart
                title="Monthly Sales"
                labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
                values={[30, 50, 40, 70, 60]}
            />
        </PageContainer>
    );
}