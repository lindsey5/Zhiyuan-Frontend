import { useThemeStore } from "../../lib/store/themeStore";

export default function LoadingScreen () {
    const { isDark } = useThemeStore();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <div className="relative flex items-center justify-center">
                {/* Spinner */}
                <div className="absolute w-30 h-30 border-4 border-gray-300 border-t-gold rounded-full animate-spin"></div>

                {/* Logo */}
                <img
                src={isDark ? "/light-logo.png" : "/dark-logo.png"}
                alt="Zhiyuan Logo"
                className="w-25 h-25 object-contain animate-pulse"
                />
            </div>

            <p className="text-sm text-primary font-medium animate-pulse">
                Loading...
            </p>
        </div>
    )
}