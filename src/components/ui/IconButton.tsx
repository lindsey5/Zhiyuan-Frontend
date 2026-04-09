import { cn } from "../../utils/utils";

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    className?: string
}

export default function IconButton ({ onClick, icon, className } : IconButtonProps) {

    return (
        <button
            className={cn(
                "cursor-pointer p-2 rounded-full hover:opacity-50",
                className
            )}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}