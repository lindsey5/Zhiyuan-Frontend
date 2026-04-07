import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/utils";

type InputProps = {
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    registration?: any; 
    className?: string;
    icon?: React.ReactNode; 
    iconPosition?: "left" | "right";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
};

export default function TextField({
    label,
    type = "text",
    className,
    placeholder,
    disabled,
    error,
    registration,
    icon,
    iconPosition = "left",
    onChange,
    value
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className={cn(
            "w-full flex flex-col gap-1",
            className
        )}>
        {label && (
            <label className="text-xs xl:text-sm text-primary font-medium">{label}</label>
        )}

        <div className="relative w-full">
            <input
                {...registration}
                disabled={disabled}
                type={inputType}
                {...(onChange ? { onChange } : {})}
                placeholder={placeholder}
                value={value}
                className={cn(
                    "w-full p-3 pr-12 bg-input-ui border text-xs xl:text-sm rounded-sm text-primary outline-none transition-all",
                    icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "",
                    error ? "border-red-500 focus:border-red-500" : "border-[var(--border-ui)] focus:border-gold"
                )}
            />

            {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                {icon}
            </div>
            )}

            {type === "password" && (
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:opacity-60"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            )}

            {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                {icon}
            </div>
            )}
        </div>

        {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}