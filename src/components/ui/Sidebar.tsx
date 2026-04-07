import React, { useState } from "react";
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Settings,
    UserCog,
    FileText,
    Eye,
    Plus,
    LogOut,
    Shield,
    ChevronRight,
    ChevronLeft,
    Tags,
    Layers,
    User,
    Network,
    TrendingUp,
    BarChart,
    Repeat,
} from "lucide-react";
import { useThemeStore } from "../../lib/store/themeStore";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import { cn } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";

export default function Sidebar({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const isDark = useThemeStore().isDark;
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();
    const location = useLocation();
    const pathname = location.pathname;

    // Track which dropdown is open
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <aside
            className={cn(
                "z-30 bg-panel flex flex-col fixed left-0 top-0 bottom-0 border-r border-[var(--border-panel)] shadow-panel transition-all ease-in-out duration-300",
                collapsed
                    ? "w-0 opacity-0 pointer-events-none lg:opacity-100 lg:w-20 lg:pointer-events-auto lg:flex"
                    : "w-64"
            )}
        >
            {/* Header / Toggle */}
            <div
                className={cn(
                    "p-2 flex items-center justify-between border-b border-[var(--border-panel)]",
                    collapsed && "justify-center"
                )}
            >
                {!collapsed && (
                    <div className="flex gap-3 items-center">
                        <img
                            src={isDark ? "/light-logo.png" : "/dark-logo.png"}
                            alt="Logo"
                            className="w-14 h-14 lg:w-16 lg:h-16 object-contain transition-opacity duration-500"
                        />
                        <div>
                            <h1 className="text-xs font-medium">Zhiyuan Enterprise</h1>
                            <p className="text-gold text-sm font-bold">Group Inc.</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gold hover:bg-[rgba(166,124,82,0.1)] p-2 rounded-md cursor-pointer"
                >
                    {!collapsed ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            {/* Avatar & User Info */}
            <div className={cn("flex items-center gap-3 p-3", collapsed && "justify-center")}>
                <div className="text-xs lg:text-sm text-inverse w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gold flex items-center justify-center font-semibold">
                    {user?.firstname.charAt(0)}
                    {user?.lastname.charAt(0)}
                </div>

                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="text-xs lg:text-sm font-medium">
                            {user?.firstname} {user?.lastname}
                        </span>
                        <span className="text-xs text-gold capitalize">
                            {user?.role || "No assigned role"}
                        </span>
                    </div>
                )}
            </div>

            {/* Menu */}
            <nav className={cn(
                "flex-1 p-2 flex flex-col gap-2 overflow-y-auto overflow-x-hidden",
                collapsed && 'items-center'
            )}>
                <SidebarItem
                    icon={<LayoutDashboard size={24} />}
                    label="Dashboard"
                    collapsed={collapsed}
                    onClick={() => navigate("/dashboard")}
                    isActive={pathname === "/dashboard"}
                />

                <SidebarDropdown
                    title="Product Management"
                    icon={<Package size={24} />}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navigate={navigate}
                    open={openDropdown === "Product Management"}
                    setOpen={() => setOpenDropdown((prev) => prev === "Product Management" ? null : "Product Management")}
                    items={[
                        { label: "View Products", icon: <Eye size={20} />, path: "/dashboard/products" },
                        { label: "Add Product", icon: <Plus size={20} />, path: "/dashboard/add-product" },
                        { label: "Variants", icon: <Layers size={20} />, path: "/dashboard/variants" },
                        { label: "Categories", icon: <Tags size={20} />, path: "/dashboard/categories" },
                    ]}
                />

                <SidebarItem
                    icon={<ClipboardList size={24} />}
                    label="Orders"
                    collapsed={collapsed}
                    onClick={() => navigate("/dashboard/orders")}
                    isActive={pathname === "/dashboard/orders"}
                />

                <SidebarItem
                    icon={<Shield size={24} />}
                    label="Role Management"
                    collapsed={collapsed}
                    onClick={() => navigate("/dashboard/roles")}
                    isActive={pathname === "/dashboard/roles"}
                />

                <SidebarItem
                    label="User Management"
                    icon={<User size={24} />}
                    collapsed={collapsed}
                    onClick={() => navigate("/dashboard/users")}
                    isActive={pathname === "/dashboard/users"}
                />

                <SidebarDropdown
                    title="Distributor Management"
                    icon={<Network size={24} />}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navigate={navigate}
                    open={openDropdown === "Distributor Management"}
                    setOpen={() => setOpenDropdown((prev) => prev === "Distributor Management" ? null : "Distributor Management")}
                    items={[
                        { label: "View Distributors", icon: <Eye size={20} />, path: "/dashboard/distributors" },
                        { label: "Distributor Sales", icon: <TrendingUp size={20} />, path: "/dashboard/distributors/sales" },
                        { label: "Reports", icon: <BarChart size={20} />, path: "/dashboard/distributors/reports" },
                        { label: "Transfer History", icon: <Repeat size={20} />, path: "/dashboard/distributors/transfer-logs" },
                    ]}
                />

                <SidebarDropdown
                    title="Settings"
                    icon={<Settings size={24} />}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navigate={navigate}
                    open={openDropdown === "Settings"}
                    setOpen={() =>
                        setOpenDropdown((prev) => (prev === "Settings" ? null : "Settings"))
                    }
                    items={[
                        { label: "Account Settings", icon: <UserCog size={20} />, path: "/dashboard/account" },
                        { label: "Audit Logs", icon: <FileText size={20} />, path: "/dashboard/audit-logs" },
                    ]}
                />

                <SidebarItem
                    icon={<LogOut size={24} />}
                    label="Log out"
                    collapsed={collapsed}
                    onClick={logout}
                />
            </nav>
        </aside>
    );
}