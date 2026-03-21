import { useMemo } from "react";
import { PERMISSIONS } from "../../config/permission";
import { useRole } from "../../hooks/useRole";
import Card from "../ui/Card"

export const getPermissionKey = (value: string) => {
    return Object.keys(PERMISSIONS).find(
        key => PERMISSIONS[key as keyof typeof PERMISSIONS] === value
    );
};

export default function AccountPermissions () {
    const { getOwnRole } = useRole();
    const permissions = getOwnRole().data?.permissions || [];
    const mappedPermissions = useMemo(() => {
        return permissions.map((perm) => getPermissionKey(perm) || "");
    }, [permissions]);

    return (
        <Card className="space-y-1 md:col-span-2">
            <h2 className="font-sans text-lg text-gold font-semibold">
                Permissions
            </h2>

            <div className="flex flex-wrap gap-2 p-3 rounded-sm">
                {mappedPermissions?.length ? (
                    mappedPermissions.map((perm: string, i: number) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-1 rounded bg-[rgba(166,124,82,0.2)] text-gold"
                        >
                            {getPermissionKey(perm)}
                        </span>
                    ))
                ) : (
                    <span className="text-md text-muted">
                        No permissions assigned
                    </span>
                )}
            </div>
        </Card>
    )
}