import {
    LayoutDashboard,
    Package,
    Boxes,
    ClipboardList,
    Settings,
    UserCog,
    FileText,
    Eye,
    Plus,
    Menu,
    LogOut,
} from "lucide-react";
import { useThemeStore } from "../../lib/store/themeStore";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import { cn } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";

export default function Sidebar({ collapsed, setCollapsed} : { collapsed : boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>>}) {
    const isDark = useThemeStore().isDark;
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    return (
        <aside
            className={cn(
                "h-screen bg-panel fixed left-0 y-0 border-r border-[var(--border-panel)] shadow-panel flex flex-col transition-all duration-300",
                collapsed ? "w-20" : "w-64"
            )}
        >
        {/* Header / Toggle */}
        <div className={cn(
            "p-2 flex items-center justify-between border-b border-[var(--border-panel)]",
            collapsed && 'p-5 justify-center'
        )}>
            
            {!collapsed && (
            <img
                src={isDark ? "/light-logo.png" : "/dark-logo.png"}
                alt="Logo"
                className="w-16 h-16 object-contain transition-opacity duration-500"
            />
            )}

            <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gold hover:bg-[rgba(166,124,82,0.1)] p-2 rounded-md"
            >
            <Menu size={18} />
            </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 flex flex-col gap-2">

            <SidebarItem
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
                collapsed={collapsed}
                onClick={() => navigate('/dashboard')}
            />

            <SidebarDropdown
                title="Product Management"
                icon={<Package size={18} />}
                collapsed={collapsed}
                navigate={navigate}
                items={[
                    { label: "View Products", icon: <Eye size={14} />, path: '/products' },
                    { label: "Add Product", icon: <Plus size={14} />, path: '/products/add-product' },
                ]}
            />

            <SidebarItem
                icon={<Boxes size={18} />}
                label="Stock Status"
                collapsed={collapsed}
                onClick={() => navigate('/dashboard/stock-status')}
            />

            <SidebarItem
                icon={<ClipboardList size={18} />}
                label="Orders"
                collapsed={collapsed}
                onClick={() => navigate('/dashboard/orders')}
            />

            <SidebarDropdown
                title="Settings"
                icon={<Settings size={18} />}
                collapsed={collapsed}
                navigate={navigate}
                items={[
                    { label: "Account Settings", icon: <UserCog size={14} />, path: '/settings/account'},
                    { label: "System Logs", icon: <FileText size={14} />, path: '/settings/system-logs'},
                ]}
            />
            <SidebarItem
                icon={<LogOut size={18} />}
                label="Log out"
                collapsed={collapsed}
                onClick={logout}
            />

        </nav>
        </aside>
    );
}