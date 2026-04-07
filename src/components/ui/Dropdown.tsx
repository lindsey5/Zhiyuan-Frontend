import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils/utils"
import { useRole } from "../../hooks/useRole"

type Option = {
    label: string
    value: string
}

type DropdownProps = {
    label?: string
    options: Option[]
    value: string
    onChange: (value: string) => void
    error?: string
    className?: string
}

export default function Dropdown({
    label,
    options,
    value,
    onChange,
    className,
    error
}: DropdownProps) {
    const [open, setOpen] = useState(false)

    const selected = options.find(o => o.value === value)

    return (
        <div className={cn(
            "flex flex-col space-y-1",
            className
        )}>
            {/* Label */}
            {label && (
                <span className="text-xs xl:text-sm text-muted px-1">
                    {label}
                </span>
            )}

            <div className="relative h-full">
                {/* Button */}
                <button
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className={cn(
                        "w-full h-full flex items-center justify-between px-4 py-2 bg-input-ui border border-[var(--border-ui)] rounded-sm text-xs xl:text-sm text-primary",
                        error && "border-red-500"
                    )}
                >
                    <span>{selected?.label || "Select"}</span>
                    <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="overflow-y-auto absolute mt-2 w-full bg-input-ui border border-[var(--border-ui)] rounded-sm z-5">
                        {options.map(option => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "px-4 py-2 text-xs xl:text-sm cursor-pointer transition hover:opacity-50",
                                    value === option.value && 'text-gold'
                                )}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <span className="text-red-500 text-xs">{error}</span>
        </div>
    )
}

type RoleDropdownProps = {
    value: string
    onChange: (value: string) => void
}

export function RoleDropdown ({value, onChange,}: RoleDropdownProps) {
    const { getRoles } = useRole();
    const { data } = getRoles();

    const options = [
        { label: 'All', value: '' },
        ...(data?.roles.map(role => ({ label: role.name, value: role.name })) || [])
    ];

    return (
        <Dropdown 
            label="Role"
            options={options}
            value={value}
            onChange={onChange}
        />
    )
}