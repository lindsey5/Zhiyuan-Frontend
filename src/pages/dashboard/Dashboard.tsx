import DashboardChart from "../../components/dashboard/DashboardChart"
import Metrics from "../../components/dashboard/Metrics"
import Card from "../../components/ui/Card"
import ToggleButton from "../../components/ui/ToggleButton"

export default function Dashboard () {
    return (
        <div className="w-full flex flex-col space-y-5 p-10">
            <Card>
                <h1 className="font-sans text-gold font-bold text-2xl">Dashboard</h1>
            </Card>
            <Metrics />
            <DashboardChart
                title="Monthly Sales"
                labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
                values={[30, 50, 40, 70, 60]}
            />
            <ToggleButton />
        </div>
    )
}