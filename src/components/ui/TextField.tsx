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