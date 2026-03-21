import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { type NavigateFunction, useLocation } from "react-router-dom";

export default function SidebarDropdown({
    title,
    icon,
    items,
    collapsed,
    navigate,
}: {
    title: string;
    icon: React.ReactNode;
    items: { label: string; icon?: React.ReactNode, path: string }[];
    collapsed: boolean;
    navigate: NavigateFunction
}) {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    return (
        <div className="flex flex-col">

            {/* Trigger */}
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-[rgba(166,124,82,0.1)] transition"
            >
                <div className="flex items-center gap-3">
                    <span className="text-gold">{icon}</span>

                    {!collapsed && (
                        <span className="text-md font-sans">{title}</span>
                    )}
                </div>

                {!collapsed && (
                    open ? (
                        <ChevronDown size={16} className="text-gold transition-transform duration-300" />
                    ) : (
                        <ChevronRight size={16} className="text-gold transition-transform duration-300" />
                    )
                )}
            </div>

            {/* Dropdown with animation */}
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
                                className={`flex items-center gap-2 text-sm px-2 py-1 rounded cursor-pointer transition
                                    ${
                                        isActive
                                            ? "text-gold bg-[rgba(166,124,82,0.2)]"
                                            : "text-muted hover:text-gold hover:bg-[rgba(166,124,82,0.1)]"
                                    }
                                `}
                                onClick={() => navigate(item.path)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}