import { Eye, EyeOff, Search } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

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
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="w-full flex flex-col gap-1">
        {label && (
            <label className="text-xs xl:text-sm text-primary font-medium">{label}</label>
        )}

        <div className="relative w-full">
            <input
            {...registration}
            disabled={disabled}
            type={inputType}
            placeholder={placeholder}
            className={`w-full p-3 pr-12 bg-input-ui border text-xs xl:text-sm rounded-sm text-primary outline-none transition-all
                ${
                error
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--border-ui)] focus:border-gold"
                }
            `}
            />

            {type === "password" && (
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:opacity-60"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            )}
        </div>

        {error && <span className="text-xs text-red-500">{error}</span>}
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
                className="text-xs xl:text-sm w-full p-3 pl-10 bg-input-ui border border-[var(--border-ui)] rounded-lg focus:border-gold text-primary outline-none transition-all"
            />
        </div>
    )
}