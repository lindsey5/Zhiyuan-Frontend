import { Menu } from "lucide-react";
import { cn } from "../../utils/utils";
import { useThemeStore } from "../../lib/store/themeStore";
import ToggleButton from "./ToggleButton";

export default function Header ({ setCollapsed } : { setCollapsed : React.Dispatch<React.SetStateAction<boolean>>}) {
    const { isDark } = useThemeStore();
    
    return (
        <header className={cn(
            "z-20 top-0 fixed lg:hidden px-3 py-2 w-full flex justify-between items-center gap-3 bg-panel shadow-panel border-b border-[var(--border-panel)]"
        )}>
            <div className="flex gap-3 items-center">
                <button className="hover:opacity-50 cursor-pointer" onClick={() => setCollapsed(false)}>
                    <Menu size={20}/>
                </button>
                <div className="flex gap-3 items-center">
                    <img
                        src={isDark ? "/light-logo.png" : "/dark-logo.png"}
                        alt="Logo"
                        className="w-12 h-12 object-contain transition-opacity duration-500"
                    />
                    <div>
                        <h1 className="text-xs font-medium">Zhiyuan Enterprise</h1>
                        <p className="text-gold text-sm font-bold">Group Inc.</p>
                    </div>
                </div>
            </div>
            <ToggleButton />
        </header>
    )
}