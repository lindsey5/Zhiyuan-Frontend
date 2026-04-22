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
  Repeat,
  FileBarChart,
  BarChartBig,
  CornerUpRight,
  Star,
  Undo2,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";
import { useThemeStore } from "../../lib/store/themeStore";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import { cn } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";
import IconButton from "./IconButton";
import ToggleButton from "./ToggleButton";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";

function SidebarSection({
    title,
    collapsed,
}: {
    title: string;
    collapsed: boolean;
}) {
    if (collapsed) return null;

    return (
        <p className="px-3 pt-4 pb-1 text-[11px] font-semibold tracking-widest text-gold/70 uppercase">
        {title}
        </p>
    );
    }

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
    const { hasAnyPermissions, hasPermissions }  = usePermissions();

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <aside
        className={cn(
            "z-20 bg-panel flex flex-col fixed left-0 top-0 bottom-0 border-r border-[var(--border-panel)] shadow-panel transition-all ease-in-out duration-300",
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

        {/* Menu */}
        <nav
            className={cn(
            "flex-1 p-2 flex flex-col gap-2 overflow-y-auto overflow-x-hidden",
            collapsed && "items-center"
            )}
        >

            <SidebarSection title="Main" collapsed={collapsed} />
            <SidebarItem
                icon={<LayoutDashboard size={24} />}
                label="Dashboard"
                collapsed={collapsed}
                onClick={() => navigate("/dashboard")}
                isActive={pathname === "/dashboard"}
            />

            {/* PRODUCT */}
            {hasAnyPermissions([
                PERMISSIONS.PRODUCT_CREATE, 
                PERMISSIONS.PRODUCT_DELETE, 
                PERMISSIONS.PRODUCT_UPDATE, 
                PERMISSIONS.PRODUCT_READ_ALL, 
                PERMISSIONS.CATEGORY_CREATE, 
                PERMISSIONS.CATEGORY_DELETE, 
                PERMISSIONS.CATEGORY_READ_ALL, 
                PERMISSIONS.CATEGORY_UPDATE,
                PERMISSIONS.SPONSORED_PRODUCT_CREATE,
                PERMISSIONS.SPONSORED_PRODUCT_VIEW_ALL
            ]) && (
                <>
                <SidebarSection title="Product" collapsed={collapsed} />

                <SidebarDropdown
                    title="Product Management"
                    icon={<Package size={24} />}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navigate={navigate}
                    open={openDropdown === "Product Management"}
                    setOpen={() =>
                        setOpenDropdown((prev) =>
                        prev === "Product Management" ? null : "Product Management"
                        )
                    }
                    items={[
                        ...(hasAnyPermissions([PERMISSIONS.PRODUCT_DELETE, PERMISSIONS.PRODUCT_UPDATE, PERMISSIONS.PRODUCT_READ_ALL]) ? [
                            {
                                label: "View Products",
                                icon: <Eye size={20} />,
                                path: "/dashboard/products",
                            }
                        ]: []),
                        ...(hasPermissions([PERMISSIONS.PRODUCT_CREATE]) ? [
                            {
                                label: "Add Product",
                                icon: <Plus size={20} />,
                                path: "/dashboard/add-product",
                            }
                        ] : []),
                        ...(hasAnyPermissions([PERMISSIONS.PRODUCT_DELETE, PERMISSIONS.PRODUCT_UPDATE, PERMISSIONS.PRODUCT_READ_ALL]) ? [
                            {
                                label: "Variants",
                                icon: <Layers size={20} />,
                                path: "/dashboard/variants",
                            },
                        ]: []),
                        ...(hasAnyPermissions([PERMISSIONS.CATEGORY_CREATE, PERMISSIONS.CATEGORY_DELETE, PERMISSIONS.CATEGORY_READ_ALL, PERMISSIONS.CATEGORY_UPDATE]) ? [
                            {
                                label: "Categories",
                                icon: <Tags size={20} />,
                                path: "/dashboard/categories",
                            },
                        ]: []),
                    ]}
                />
                {hasAnyPermissions([PERMISSIONS.SPONSORED_PRODUCT_VIEW_ALL, PERMISSIONS.SPONSORED_PRODUCT_CREATE]) && (
                    <SidebarItem
                        icon={<Star size={24} />}
                        label="Sponsored Products"
                        collapsed={collapsed}
                        onClick={() => navigate("/dashboard/sponsored-products")}
                        isActive={pathname === "/dashboard/sponsored-products"}
                    />
                )}
                </>
            )}

            {hasAnyPermissions([
                PERMISSIONS.DISTRIBUTOR_CREATE,
                PERMISSIONS.DISTRIBUTOR_READ_ALL,
                PERMISSIONS.DISTRIBUTOR_DELETE,
                PERMISSIONS.DISTRIBUTOR_SALES_VIEW, 
                PERMISSIONS.DISTRIBUTOR_STOCK_VIEW, 
                PERMISSIONS.DISTRIBUTOR_STATS_VIEW,
                PERMISSIONS.DISTRIBUTOR_REPORTS_VIEW,
            ]) && (
                <>
                {/* DISTRIBUTOR */}
                <SidebarSection title="Distributor" collapsed={collapsed} />

                <SidebarDropdown
                    title="Distributor Management"
                    icon={<Network size={24} />}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navigate={navigate}
                    open={openDropdown === "Distributor Management"}
                    setOpen={() =>
                        setOpenDropdown((prev) =>
                        prev === "Distributor Management"
                            ? null
                            : "Distributor Management"
                        )
                    }
                    items={[
                        ...(hasAnyPermissions([
                            PERMISSIONS.DISTRIBUTOR_CREATE,
                            PERMISSIONS.DISTRIBUTOR_READ_ALL,
                            PERMISSIONS.DISTRIBUTOR_DELETE,
                            PERMISSIONS.DISTRIBUTOR_SALES_VIEW,
                            PERMISSIONS.DISTRIBUTOR_STOCK_VIEW, 
                            PERMISSIONS.DISTRIBUTOR_STATS_VIEW,
                        ]) ? [
                            {
                                label: "View Distributors",
                                icon: <Eye size={20} />,
                                path: "/dashboard/distributors",
                            },
                        ] : []),

                        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_SALES_VIEW]) ? [                        
                        {
                            label: "Distributor Sales",
                            icon: <BarChartBig size={20} />,
                            path: "/dashboard/distributors/sales",
                        }] : []),

                        ...(hasPermissions([PERMISSIONS.DISTRIBUTOR_REPORTS_VIEW]) ? [                        
                        {
                            label: "Reports",
                            icon: <FileBarChart size={20} />,
                            path: "/dashboard/distributors/reports",
                        },] : []),
                    ]}
                />
                </>
            )}

            {hasAnyPermissions([
                PERMISSIONS.DISTRIBUTOR_STOCK_VIEW, 
                PERMISSIONS.STOCK_DISTRIBUTION_CREATE,
                PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_ALL,
                PERMISSIONS.STOCK_DISTRIBUTION_UPDATE,
                PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_VIEW, 
                PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE,
            ]) && (
                <SidebarDropdown
                    title="Stock Management"
                    icon={<PackageCheck size={24} />}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    navigate={navigate}
                    open={openDropdown === "Distributor Stocks"}
                    setOpen={() =>
                        setOpenDropdown((prev) =>
                        prev === "Distributor Stocks"
                            ? null
                            : "Distributor Stocks"
                        )
                    }
                    items={[
                        ...(hasAnyPermissions([PERMISSIONS.STOCK_ORDERS_UPDATE, PERMISSIONS.STOCK_ORDERS_VIEW_ALL]) ? [                        
                        {
                            label: "Stock Orders",
                            icon: <ShoppingCart size={20} />,
                            path: "/dashboard/distributors/stock-orders",
                        }] : []),

                        ...(hasPermissions([PERMISSIONS.STOCK_DISTRIBUTION_CREATE]) ? [
                            {
                            label: "Distribute Stocks",
                            icon: <CornerUpRight size={20} />,
                            path: "/dashboard/distributors/transfer-stocks",
                        }] : []),

                        ...(hasAnyPermissions([PERMISSIONS.STOCK_DISTRIBUTION_UPDATE, PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_ALL]) ? [                        
                        {
                            label: "Distribution History",
                            icon: <Repeat size={20} />,
                            path: "/dashboard/distributors/transfer-logs",
                        }] : []),

                        ...(hasAnyPermissions([PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_VIEW, PERMISSIONS.DISTRIBUTOR_RETURN_REQUEST_UPDATE]) ? [
                            {
                                label: "Return Requests",
                                icon: <Undo2 size={20} />,
                                path: "/dashboard/distributors/return-requests",
                            }
                        ] : []),
                    ]}
                />
            )}


            {hasAnyPermissions([
                PERMISSIONS.ROLE_CREATE, 
                PERMISSIONS.ROLE_READ_ALL, 
                PERMISSIONS.ROLE_UPDATE, 
                PERMISSIONS.ROLE_DELETE,
                PERMISSIONS.USER_CREATE, 
                PERMISSIONS.USER_DELETE, 
                PERMISSIONS.USER_UPDATE, 
                PERMISSIONS.USER_READ_ALL
            ]) && (
                <>
                <SidebarSection title="Roles & Users" collapsed={collapsed} />

                {hasPermissions([
                    PERMISSIONS.ROLE_CREATE, 
                    PERMISSIONS.ROLE_READ_ALL, 
                    PERMISSIONS.ROLE_UPDATE, 
                    PERMISSIONS.ROLE_DELETE,
                ]) && (
                    <SidebarItem
                        icon={<Shield size={24} />}
                        label="Role Management"
                        collapsed={collapsed}
                        onClick={() => navigate("/dashboard/roles")}
                        isActive={pathname === "/dashboard/roles"}
                    />
                )}

                {hasAnyPermissions([
                    PERMISSIONS.USER_CREATE, 
                    PERMISSIONS.USER_DELETE, 
                    PERMISSIONS.USER_UPDATE, 
                    PERMISSIONS.USER_READ_ALL
                ]) && (
                    <SidebarItem
                        label="User Management"
                        icon={<User size={24} />}
                        collapsed={collapsed}
                        onClick={() => navigate("/dashboard/users")}
                        isActive={pathname === "/dashboard/users"}
                    />
                )}
                </>
            )}

            {hasAnyPermissions([
                PERMISSIONS.ORDER_READ_ALL, 
                PERMISSIONS.ORDER_UPDATE
            ]) && (
                <>
                {/* Walk-in Orders*/}
                <SidebarSection title="Walk-in Orders" collapsed={collapsed} />

                {hasAnyPermissions([PERMISSIONS.ORDER_READ_ALL, PERMISSIONS.ORDER_UPDATE]) && (
                    <SidebarItem
                        icon={<ClipboardList size={24} />}
                        label="Orders"
                        collapsed={collapsed}
                        onClick={() => navigate("/dashboard/orders")}
                        isActive={pathname === "/dashboard/orders"}
                    />
                )}

                <SidebarItem
                    icon={<BarChartBig size={24} />}
                    label="Sales"
                    collapsed={collapsed}
                    onClick={() => navigate("/dashboard/orders/sales")}
                    isActive={pathname === "/dashboard/orders/sales"}
                />
                </>
            )}

            {/* SETTINGS */}
            <SidebarSection title="Settings" collapsed={collapsed} />

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
                    {
                        label: "Account Settings",
                        icon: <UserCog size={20} />,
                        path: "/dashboard/account",
                    },
                    ...(hasPermissions([PERMISSIONS.AUDIT_VIEW_ALL]) ? [{
                        label: "Audit Logs",
                        icon: <FileText size={20} />,
                        path: "/dashboard/audit-logs",
                    }] : [] )
                ]}
            />
        </nav>

        {/* Footer */}
        <div
            className={cn(
            "flex items-center gap-3 p-3 mt-auto border-t border-white/10",
            collapsed ? "justify-center" : "justify-between"
            )}
        >
            <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 text-xs lg:text-sm text-inverse w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gold flex items-center justify-center font-semibold uppercase">
                {user?.firstname?.[0]}
                {user?.lastname?.[0]}
            </div>

            {!collapsed && (
                <div className="flex flex-col min-w-0">
                <span className="text-xs lg:text-sm font-medium truncate">
                    {user?.firstname} {user?.lastname}
                </span>
                <span className="text-[11px] lg:text-xs text-gold/80 capitalize truncate">
                    {user?.role || "No assigned role"}
                </span>
                </div>
            )}
            </div>

            {!collapsed && (
            <IconButton
                className="hover:bg-[rgba(166,124,82,0.1)] rounded-md"
                icon={<LogOut size={20} className="text-gold" />}
                onClick={logout}
            />
            )}
        </div>

        <ToggleButton className="self-center my-2 md:hidden" />
        </aside>
    );
}