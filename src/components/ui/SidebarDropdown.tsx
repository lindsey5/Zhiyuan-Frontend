import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type NavigateFunction, useLocation } from "react-router-dom";

export default function SidebarDropdown({
    title,
    icon,
    items,
    collapsed,
    navigate,
    setCollapsed,
}: {
    title: string;
    icon: React.ReactNode;
    items: { label: string; icon?: React.ReactNode; path: string }[];
    collapsed: boolean;
    navigate: NavigateFunction;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const openDropdown = () => {
        if(collapsed) {
            setCollapsed(false)
            setOpen(true)
        }
        else setOpen(prev => !prev)
    }

    return (
        <div className="flex flex-col">

            {/* Trigger */}
            <div
                onClick={openDropdown}
                className="relative group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-[rgba(166,124,82,0.1)] transition"
            >
                <div className="flex items-center gap-3">
                    <span className="text-gold">{icon}</span>

                    {!collapsed && (
                        <span className="text-md font-sans">{title}</span>
                    )}
                </div>

                {/* Arrow */}
                {!collapsed && (
                    open ? (
                        <ChevronDown size={16} className="text-gold transition-transform duration-300" />
                    ) : (
                        <ChevronRight size={16} className="text-gold transition-transform duration-300" />
                    )
                )}

                {/* Tooltip (collapsed only) */}
                {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition z-50">
                        {title}
                    </span>
                )}
            </div>

            {/* Dropdown */}
            {!collapsed && (
                <div
                    className={`flex flex-col ml-6 border-l border-[var(--border-panel)] pl-3 gap-1 overflow-hidden transition-all duration-300 ease-in-out
                        ${open ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
                    `}
                >
                    {items.map((item, i) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={i}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition
                                    ${
                                        isActive
                                            ? "text-gold bg-[rgba(166,124,82,0.2)]"
                                            : "text-muted hover:text-gold hover:bg-[rgba(166,124,82,0.1)]"
                                    }
                                `}
                            >
                                {item.icon}

                                {!collapsed && (
                                    <span>{item.label}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}