import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { useState } from "react";
import { cn } from "../utils/utils";

export default function DashboardLayout () {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={cn("flex w-full", !collapsed ? 'pl-64' : 'pl-20')}>
            <Sidebar 
                collapsed={collapsed} 
                setCollapsed={setCollapsed}
            />
            <Outlet />
        </div>
    )
}