import { useThemeStore } from "../../lib/store/themeStore";

const ToggleButton = ({ className } : { className?: string }) => {
    const { isDark, toggleTheme } = useThemeStore();
    
    return (
        <div className={className}>
            <button
                onClick={toggleTheme}
                className="border border-[var(--toggle-border)] flex items-center gap-3 px-3 py-2 rounded-full bg-toggle shadow-xl transition-all hover:scale-105"
            >
                <span className="text-sm">{isDark ? '🌙' : '☀️'}</span>
                <div className="w-[2px] h-6 bg-separator opacity-40" />
                <div className="relative w-12 h-6 rounded-full bg-toggle-inner p-1">
                    <div className={`w-4 h-4 rounded-full bg-toggle-thumb transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
            </button>
        </div>
  )
}

export default ToggleButton