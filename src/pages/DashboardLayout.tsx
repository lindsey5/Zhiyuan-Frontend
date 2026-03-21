import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { useState } from "react";
import { cn } from "../utils/utils";
import { useThemeStore } from "../lib/store/themeStore";

export default function DashboardLayout () {
    const [collapsed, setCollapsed] = useState(false);
    const { isDark } = useThemeStore();    

    return (
        <div 
            className={cn("w-full min-h-screen transition-all duration-500 bg-main bg-cover bg-center", !collapsed ? 'pl-64' : 'pl-20')} 
            style={{ backgroundImage: `url(${isDark ? '/dark-bg.jpg' : '/light-bg.jpg'})` }}
        >
            <Sidebar 
                collapsed={collapsed} 
                setCollapsed={setCollapsed}
            />
            <Outlet />
        </div>
    )
}