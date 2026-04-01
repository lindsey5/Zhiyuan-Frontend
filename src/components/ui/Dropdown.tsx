import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../utils/utils"
import { useRole } from "../../hooks/useRole"
import { useAuthStore } from "../../lib/store/authStore"

type Option = {
    label: string
    value: string
}

type DropdownProps = {
    title?: string
    options: Option[]
    value: string
    onChange: (value: string) => void
    error?: string
}

export default function Dropdown({
    title,
    options,
    value,
    onChange,
    error
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
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className={cn(
                        "w-full flex items-center justify-between px-4 py-2 bg-panel border border-[var(--border-ui)] rounded-sm text-sm text-primary",
                        error && "border-red-500"
                    )}
                >
                    <span>{selected?.label || "Select"}</span>
                    <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="max-h-50 overflow-y-auto absolute mt-2 w-full bg-panel border border-[var(--border-ui)] rounded-sm z-10">
                        {options.map(option => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "px-4 py-2 text-sm cursor-pointer transition hover:opacity-50",
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
    const accessToken = useAuthStore().accessToken;
    const { getRoles } = useRole();
    const { data } = getRoles(accessToken || "");

    const options = [
        { label: 'All', value: '' },
        ...(data?.roles.map(role => ({ label: role.name, value: role.name })) || [])
    ];

    return (
        <Dropdown 
            title="Role"
            options={options}
            value={value}
            onChange={onChange}
        />
    )
}