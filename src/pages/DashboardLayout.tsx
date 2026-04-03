import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { useState, useEffect } from "react";
import { cn } from "../utils/utils";
import { useThemeStore } from "../lib/store/themeStore";
import ToggleButton from "../components/ui/ToggleButton";
import Header from "../components/ui/Header";

export default function DashboardLayout() {
    const { isDark } = useThemeStore();    
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (window.innerWidth >= 1024) setCollapsed(false);
        else setCollapsed(true);

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div 
            className={cn(
                "mt-16 lg:mt-0 w-full min-h-screen transition-all duration-500 bg-main bg-cover bg-center relative", 
                !collapsed ? 'lg:pl-64' : 'lg:pl-20'
            )} 
            style={{ backgroundImage: `url(${isDark ? '/dark-bg.jpg' : '/light-bg.jpg'})` }}
        >
            <Header setCollapsed={setCollapsed} />
            <Sidebar 
                collapsed={collapsed} 
                setCollapsed={setCollapsed}
            />
            <ToggleButton className="fixed z-20 top-3 right-3 lg:top-10 lg:right-10" /> 
            <Outlet />
        </div>
    );
}