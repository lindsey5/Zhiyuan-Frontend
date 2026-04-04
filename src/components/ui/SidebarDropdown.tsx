import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type NavigateFunction, useLocation } from "react-router-dom";
import { cn } from "../../utils/utils";

interface SidebarDropdownProps {
    title: string;
    icon: React.ReactNode;
    items: { label: string; icon?: React.ReactNode; path: string }[];
    collapsed: boolean;
    navigate: NavigateFunction;
    open: boolean;
    setOpen: () => void;
    className?: string;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarDropdown({
    title,
    icon,
    items,
    collapsed,
    navigate,
    open,
    setOpen,
    className,
    setCollapsed
}: SidebarDropdownProps) {
    const location = useLocation();

    const openDropdown = () => {
        if(collapsed) {
            setCollapsed(false)
            setOpen()
        }
        else setOpen()
    }

    return (
        <div className={cn("flex flex-col relative", className)}>
            {/* Trigger */}
            <div
                onClick={openDropdown}
                className="group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-[rgba(166,124,82,0.1)] hover:text-gold transition"
            >
                <div className="flex items-center gap-3">
                    <span className="text-gold">{icon}</span>
                    {!collapsed && <span className="text-md font-sans">{title}</span>}
                </div>

                {!collapsed && (
                    open ? (
                        <ChevronDown size={16} className="text-gold transition-transform duration-300" />
                    ) : (
                        <ChevronRight size={16} className="text-gold transition-transform duration-300" />
                    )
                )}
            </div>

            {/* Dropdown Items */}
            {!collapsed && (
                <div
                    className={cn(
                        "flex flex-col ml-6 border-l border-[var(--border-panel)] pl-3 gap-1 transition-all duration-300 ease-in-out",
                        open ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0 overflow-hidden"
                    )}
                >
                    {items.map((item, i) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={i}
                                onClick={() => navigate(item.path)}
                                className={cn(
                                    "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition",
                                    isActive
                                        ? "text-gold bg-[rgba(166,124,82,0.2)]"
                                        : "text-muted hover:text-gold hover:bg-[rgba(166,124,82,0.1)]"
                                )}
                            >
                                {item.icon}
                                {!collapsed && <span className="text-sm">{item.label}</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}