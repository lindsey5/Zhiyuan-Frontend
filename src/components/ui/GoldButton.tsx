import React from "react";
import { cn } from "../../utils/utils";

interface GoldButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export default function GoldButton({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    className = "",
}: GoldButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                `flex items-center justify-center gap-2
                cursor-pointer
                px-5 py-2 rounded-md 
                bg-gold font-semibold
                hover:opacity-90 transition
                disabled:opacity-50 disabled:cursor-not-allowed
                text-inverse`,
                className
            )}
        >
            {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {loading ? "Loading..." : children}
        </button>
    );
}