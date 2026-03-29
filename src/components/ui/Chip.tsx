import { cn } from "../../utils/utils";

export default function Chip ({ children, className } : { children : React.ReactNode, className?: string}) {
    return (
        <span
            className={cn(
                "text-xs px-3 py-1 rounded-full bg-chip text-gold border border-[rgba(166,124,82,0.3)]",
                className
            )}
        >
            {children}
        </span>
    )
}