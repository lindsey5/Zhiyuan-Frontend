import React from "react"
import { cn } from "../../utils/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode
    label?: string
}

export default function Button({ icon, label, className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                "px-4 py-2 rounded-sm bg-panel border border-[var(--border-panel)] text-primary transition flex items-center justify-center gap-2 text-sm cursor-pointer hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
        >
            {icon}
            {label && <span>{label}</span>}
        </button>
    )
}`  `