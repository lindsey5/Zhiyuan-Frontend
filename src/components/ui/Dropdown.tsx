import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Option = {
    label: string
    value: string
}

type DropdownProps = {
    title?: string
    options: Option[]
    value: string
    onChange: (value: string) => void
}

export default function Dropdown({
    title,
    options,
    value,
    onChange
}: DropdownProps) {
    const [open, setOpen] = useState(false)

    const selected = options.find(o => o.value === value)

    return (
        <div className="flex flex-col space-y-1 w-48">
            {/* Title */}
            {title && (
                <span className="text-xs text-muted px-1">
                    {title}
                </span>
            )}

            <div className="relative">
                {/* Button */}
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="w-full flex items-center justify-between px-4 py-2 bg-panel border border-[var(--border-ui)] rounded-sm text-sm text-primary"
                >
                    <span>{selected?.label || "Select"}</span>
                    <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute mt-2 w-full bg-panel border border-[var(--border-ui)] rounded-sm z-10">
                        {options.map(option => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                                className="px-4 py-2 text-sm cursor-pointer transition hover:opacity-50"
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}