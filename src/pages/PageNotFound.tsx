import React from "react";
import Card from "../components/ui/Card";
import { XCircle } from "lucide-react";
import { useThemeStore } from "../lib/store/themeStore";

export default function PageNotFound() {
    const { isDark } = useThemeStore();    

    return (
        <div
            style={{ backgroundImage: `url(${isDark ? '/dark-bg.jpg' : '/light-bg.jpg'})` }}
            className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-center relative overflow-hidden"
        >
            <Card className="flex flex-col items-center gap-4 max-w-xs text-center p-10">
                <XCircle size={60} className="text-gold" />
                <h1 className="text-4xl font-bold text-primary">404</h1>
                <h2 className="text-xl font-medium text-primary">Page Not Found</h2>
                <p className="text-muted text-sm">
                    The page you are looking for might have been removed or does not exist.
                </p>
                <a
                    href="/"
                    className="mt-4 px-5 py-2 bg-gold text-white rounded-md font-medium hover:bg-opacity-90 transition"
                >
                    Back to Home
                </a>
            </Card>
        </div>
    );
}