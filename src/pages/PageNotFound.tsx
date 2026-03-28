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

            <Card className="z-10 p-12 flex flex-col items-center gap-6 shadow-2xl max-w-sm text-center">
                <XCircle size={80} className="text-gold" />
                <h1 className="text-5xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold text-primary">Oops! Page Not Found</h2>
                <p className="text-muted">
                The page you are looking for might have been removed or does not exist.
                </p>
                <a
                    href="/"
                    className="text-sm mt-4 px-6 py-3 bg-gold text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
                >
                Back to Home
                </a>
            </Card>
        </div>
    );
}