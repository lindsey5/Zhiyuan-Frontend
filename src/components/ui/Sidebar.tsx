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
} from "lucide-react";
import { useThemeStore } from "../../lib/store/themeStore";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import { cn } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";
import ToggleButton from "./ToggleButton";

export default function Sidebar({ collapsed, setCollapsed} : { collapsed : boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}) {
    const isDark = useThemeStore().isDark;
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const location = useLocation();
    const pathname = location.pathname;
    const { user } = useAuthStore();

    return (
        <aside
            className={cn(
                "z-2 relative h-screen bg-panel fixed left-0 y-0 border-r border-[var(--border-panel)] shadow-panel flex flex-col transition-all duration-300",
                collapsed ? "w-20" : "w-64"
            )}
        >
        {/* Header / Toggle */}
        <div className={cn(
            "p-2 flex items-center justify-between border-b border-[var(--border-panel)]",
            collapsed && 'p-5 justify-center'
        )}>
            
            {!collapsed && (
                <div className="flex gap-3 items-center">
                    <img
                        src={isDark ? "/light-logo.png" : "/dark-logo.png"}
                        alt="Logo"
                        className="w-16 h-16 object-contain transition-opacity duration-500"
                    />
                    <div>
                        <h1 className="text-xs font-medium">Zhiyuan Enterprise</h1>
                        <p className="text-gold text-sm font-bold">Group Inc.</p>
                    </div>
                </div>
            )}

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-gold hover:bg-[rgba(166,124,82,0.1)] p-2 rounded-md"
            >
                {!collapsed ? <ChevronLeft /> : <ChevronRight />}
            </button>
        </div>

        <div className={cn("flex items-center gap-3 p-5", collapsed && "justify-center")}>
            {/* Avatar */}
            <div className="text-avatar w-10 h-10 rounded-full bg-gold flex items-center justify-center font-semibold">
                {user?.firstname.charAt(0)}{user?.lastname?.charAt(0)}
            </div>

            {/* User Info */}
            {!collapsed && (
                <div className="flex flex-col">
                    <span className="text-sm font-medium">
                        {user?.firstname} {user?.lastname}
                    </span>
                    <span className="text-xs text-gold capitalize">
                        {user?.role || "No assigned role"}
                    </span>
                </div>
            )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 flex flex-col gap-2">

            <SidebarItem
                icon={<LayoutDashboard size={24} />}
                label="Dashboard"
                collapsed={collapsed}
                onClick={() => navigate('/dashboard')}
                isActive={pathname === '/dashboard'}
            />

            <SidebarDropdown
                title="Product Management"
                icon={<Package size={24} />}
                collapsed={collapsed}
                navigate={navigate}
                items={[
                    { label: "View Products", icon: <Eye size={20} />, path: '/dashboard/products' },
                    { label: "Add Product", icon: <Plus size={20} />, path: '/dashboard/add-product' },
                    { label: "Categories", icon: <Tags size={20} />, path: '/dashboard/categories' },
                ]}
                setCollapsed={setCollapsed}
            />

            <SidebarItem
                icon={<ClipboardList size={24} />}
                label="Orders"
                collapsed={collapsed}
                onClick={() => navigate('/dashboard/orders')}
                isActive={pathname === '/dashboard/orders'}
            />
            
            <SidebarItem
                icon={<Shield size={24} />}
                label="Role Management"
                collapsed={collapsed}
                onClick={() => navigate('/dashboard/roles')}
                isActive={pathname === '/dashboard/roles'}
            />

            <SidebarDropdown
                title="Settings"
                icon={<Settings size={24} />}
                collapsed={collapsed}
                navigate={navigate}
                items={[
                    { label: "Account Settings", icon: <UserCog size={20} />, path: '/dashboard/account'},
                    { label: "System Logs", icon: <FileText size={20} />, path: '/dashboard/system-logs'},
                ]}
                setCollapsed={setCollapsed}
            />
            <SidebarItem
                icon={<LogOut size={24} />}
                label="Log out"
                collapsed={collapsed}
                onClick={logout}
            />
        </nav>
        {!collapsed && <ToggleButton className="absolute bottom-5 left-1/2 -translate-x-1/2"/>}
        </aside>
    );
}