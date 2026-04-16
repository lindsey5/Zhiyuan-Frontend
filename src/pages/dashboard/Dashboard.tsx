import DashboardChart from "../../components/ui/Chart"
import Metrics from "../../components/dashboard/Metrics"
import PageContainer from "../../components/ui/PageContainer"

export default function Dashboard() {

    return (
        <PageContainer 
            title="Dashboard"
            description="Overview of your system metrics and activities."
        >
            <Metrics />

            <DashboardChart
                formatToPeso
                title="Monthly Sales"
                labels={[
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ]}
                values={[30, 50, 40, 70, 60, 90, 80, 75, 65, 85, 95, 100]}
            />
        </PageContainer>
    );
}