import { Pencil, Shield, User } from "lucide-react";
import { getPermissionKey } from "../../config/permission";
import type { RoleWithUsersCount } from "../../types/role.type";
import Card from "../ui/Card";
import Chip from "../ui/Chip";
import type { NavigateFunction } from "react-router-dom";

export default function RoleCard ({ role, navigateTo } : { role : RoleWithUsersCount, navigateTo: NavigateFunction }) {
    return (
        <Card className="space-y-3">
            <div className="flex justify-between gap-3">
                <div className="flex items-center gap-3">
                    {role.name === 'Admin' ? <Shield size={35} className="text-gold"/> : <User size={35} className="text-gold"/>}
                    <div>
                        <h1 className="text-gold font-bold text-md">{role.name}</h1>
                        <p className="text-[var(--border-ui)] text-sm">Users: {role.usersCount}</p>
                    </div>
                </div>
                <button className="hover:opacity-50 cursor-pointer" onClick={() => navigateTo(`/dashboard/edit-role/${role._id}`)}>
                    <Pencil size={20} className="text-gold"/>
                </button>
            </div>
            <div className="h-[2px] bg-[var(--border-panel)]"/>
            <p className="text-sm xl:text-md">{role.description}</p>
            <p className="text-[var(--border-ui)] text-xs xl:text-sm mt-2">Permissions ({role.permissions.length})</p>
            <div className="flex flex-wrap gap-2">
                {role.permissions.slice(0, 5).map(perm => (
                    <Chip key={perm.action}>
                        {getPermissionKey(perm.action)}
                    </Chip>
                ))}
                {role.permissions.length > 3 && (
                    <Chip>
                        +{role.permissions.length - 3}
                    </Chip>
                )}
            </div>
        </Card>
    )
}