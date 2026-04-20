import React from "react"
import { cn } from "../../utils/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode
    label?: string
}

export default function Button({ icon, label, className, onClick, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                "bg-input-ui md:px-4 px-3 py-2 rounded-sm border border-[var(--border-panel)] text-primary transition flex items-center justify-center gap-2 text-sm cursor-pointer hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
            }}
        >
            {icon}
            {label && <span>{label}</span>}
        </button>
    )
}`  `