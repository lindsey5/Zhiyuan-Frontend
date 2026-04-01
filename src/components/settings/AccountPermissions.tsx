import { useMemo } from "react";
import { getPermissionKey, PERMISSION_DESCRIPTIONS } from "../../config/permission";
import { useRole } from "../../hooks/useRole";
import Card from "../ui/Card";
import Chip from "../ui/Chip";
import { useAuthStore } from "../../lib/store/authStore";

export default function AccountPermissions() {
    const accessToken = useAuthStore().accessToken;
    const { getOwnRole } = useRole();
    const { data } = getOwnRole(accessToken || "");
    const role = data?.role;
    const permissions = data?.permissions || [];

    const categorizedPermissions = useMemo(() => {
        const result: Record<string, string[]> = {};

        permissions.forEach((perm) => {
            for (const [category, perms] of Object.entries(PERMISSION_DESCRIPTIONS)) {
                const permissionKey = getPermissionKey(perm) || "";

                if (permissionKey in perms) {
                    if (!result[category]) result[category] = [];

                    result[category].push(
                        perms[permissionKey as keyof typeof perms]
                    );
                }
            }
        });

        return result;
    }, [permissions]);

    return (
        <Card className="md:col-span-2 space-y-6">

            {/* ROLE SECTION */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gold">
                        {role?.name || "N/A" }
                    </h2>
                    <p className="text-sm text-muted mt-1">
                        {role?.description || "No assigned role"}
                    </p>
                </div>
            </div>

            {/* PERMISSIONS HEADER */}
            <div>
                <h3 className="text-lg font-semibold text-gold border-b border-[var(--border-panel)] pb-2">
                    Permissions
                </h3>
            </div>

            {/* PERMISSIONS LIST */}
            <div className="space-y-6">
                {Object.keys(categorizedPermissions).length ? (
                    Object.entries(categorizedPermissions).map(
                        ([category, perms]) => (
                            <Card
                                key={category}
                                className="space-y-3 shadow-0"
                            >
                                {/* Category Title */}
                                <h4 className="text-sm font-semibold text-primary">
                                    {category}
                                </h4>

                                {/* Permissions */}
                                <div className="flex flex-wrap gap-2">
                                    {perms.map((perm) => (
                                        <Chip key={perm}>{perm}</Chip>
                                    ))}
                                </div>
                            </Card>
                        )
                    )
                ) : (
                    <div className="text-center py-6 text-muted">
                        No permissions assigned
                    </div>
                )}
            </div>
        </Card>
    );
}