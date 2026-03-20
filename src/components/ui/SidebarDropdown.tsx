import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function SidebarDropdown({
    title,
    icon,
    items,
    collapsed,
}: {
    title: string;
    icon: React.ReactNode;
    items: { label: string; icon?: React.ReactNode }[];
    collapsed: boolean;
}) {
    const [open, setOpen] = useState(true);

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
                        <ChevronDown size={16} className="text-gold" />
                    ) : (
                        <ChevronRight size={16} className="text-gold" />
                    )
                )}
            </div>

            {/* Dropdown */}
            {!collapsed && open && (
                <div className="flex flex-col mt-1 ml-6 border-l border-[var(--border-panel)] pl-3 gap-1">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted px-2 py-1 rounded cursor-pointer hover:text-gold hover:bg-[rgba(166,124,82,0.1)] transition"
                    >
                    {item.icon}
                    <span>{item.label}</span>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}