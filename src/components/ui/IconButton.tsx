import { useThemeStore } from "../../lib/store/themeStore";
import { cn } from "../../utils/utils";

interface IconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
}

export default function IconButton ({ onClick, icon } : IconButtonProps) {
    const { isDark } = useThemeStore();

    return (
        <button
            className={cn(
                "cursor-pointer p-2 rounded-full",
                isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
            )}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}