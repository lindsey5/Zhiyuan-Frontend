import { useState } from "react"
import { getPermissionKey, PERMISSION_DESCRIPTIONS } from "../../config/permission";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { RoleFormData } from "../../schemas/roleSchema";
import { cn } from "../../utils/utils";

interface PermissionsContainer { 
    category: string
    permissions: { 
        description: string
        value : string
    }[]
    watch: UseFormWatch<RoleFormData>
    setValue: UseFormSetValue<RoleFormData>
}

export default function PermissionsContainer ({ 
    category, 
    permissions,
    watch,
    setValue
} : PermissionsContainer) {
    const [show, setShow] = useState(false);
    const checkedPermissions = watch('permissions');
    const description = PERMISSION_DESCRIPTIONS[category]?.description;

    const handleChange = (value: string) => {
        const updated = checkedPermissions.includes(value)
        ? checkedPermissions.filter((v) => v !== value)
        : [...checkedPermissions, value];
        setValue("permissions", updated)
    };

    return (
        <div className="my-5">
            <div
                className="cursor-pointer"
                onClick={() => setShow(!show)}
            >
                <div className="w-full flex justify-between">
                    <div className="flex flex-col items-start gap-2">
                        <h1 className="text-gold text-md font-semibold">
                            {category}
                        </h1>
                        <p className="text-gray">{description}</p>
                    </div>
                    {show ? <ChevronUp /> : <ChevronDown />}
                </div>
                <div className="h-[1px] bg-gray mt-2"/>
            </div>

            {/* Permissions */}
            {show && (
                <div className="space-y-5 mt-6">
                    {permissions.map((perm) => (
                        <div key={perm.value} className="flex items-center gap-2 flex">
                            <input
                                type="checkbox"
                                checked={checkedPermissions.includes(perm.value)}
                                className={cn("h-5 w-5", checkedPermissions.includes(perm.value) && "text-gold")}
                                onChange={() => handleChange(perm.value)}
                            />
                            <h1>{getPermissionKey(perm.value)}</h1>
                            <p className="text-gray">{perm.description}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}