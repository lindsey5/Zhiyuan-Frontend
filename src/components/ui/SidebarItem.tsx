export default function SidebarItem({
    icon,
    label,
    collapsed,
}: {
    icon: React.ReactNode;
    label: string;
    collapsed: boolean;
}) {
    return (
        <div className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-[rgba(166,124,82,0.1)] hover:text-gold transition">
        <span className="text-gold">{icon}</span>

        {!collapsed && (
            <span className="text-md font-sans">{label}</span>
        )}
        </div>
    );
}