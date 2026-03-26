import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type InputProps = {
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    registration?: any; 
};

export default function TextField({
    label,
    type = "text",
    placeholder,
    disabled,
    error,
    registration,
}: InputProps) {
    return (
        <div className="w-full flex flex-col gap-1">
            {label && (
                <label className="text-sm text-primary font-medium">
                    {label}
                </label>
            )}

            <input
                {...registration}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                className={`w-full p-3 bg-input-ui border rounded-sm font-sans text-primary outline-none transition-all
                    ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-[var(--border-ui)] focus:border-gold"
                    }
                `}
            />

            {error && (
                <span className="text-xs text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
}

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement>

export function SearchField(props: SearchFieldProps) {
    return (
        <div className="relative">
            <Search 
                className="absolute left-3 top-3"
                size={20}
            />
            <input
                {...props}
                className="w-full p-3 pl-10 bg-input-ui border border-[var(--border-ui)] rounded-lg focus:border-gold font-sans text-primary outline-none transition-all"
            />
        </div>
    )
}