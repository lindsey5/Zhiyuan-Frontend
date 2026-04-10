export default function SidebarItem({
    icon,
    label,
    collapsed,
    isActive = false,
    onClick, 
}: {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
    isActive?: boolean;
    onClick: () => void;
}) {
    return (
        <button 
            className={`z-20 group flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition
                ${
                    isActive
                        ? "bg-[rgba(166,124,82,0.35)] text-gold"
                        : "hover:bg-[rgba(166,124,82,0.1)] hover:text-gold"
                }
            `}
            onClick={onClick}
        >
            <span className="text-gold">{icon}</span>

            {!collapsed && (
                <span className="text-xs md:text-sm">
                    {label}
                </span>
            )}
            {collapsed && (
                <span className="pointer-events-none select-none absolute left-full ml-2 px-2 py-1 text-xs md:text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition z-50">
                    {label}
                </span>
            )}
        </button>
    );
}