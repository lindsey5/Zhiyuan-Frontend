import { Pencil, Shield, User } from "lucide-react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import { getPermissionKey } from "../../config/permission";
import { useRole } from "../../hooks/useRole";
import GoldButton from "../../components/ui/GoldButton";
import Chip from "../../components/ui/Chip";

export default function Roles () {
    const { getRoles } = useRole();
    const { data } = getRoles();

    return (
        <PageContainer 
            title="Role Management"
            description="Manage user roles and permissions"
        >
            <div className="w-full flex justify-end">
                <GoldButton className="text-sm">
                    Create Role
                </GoldButton>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.roles.map(role => (
                    <Card className="space-y-3">
                        <div className="flex justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {role.name === 'Admin' ? <Shield size={35} className="text-gold"/> : <User size={35} className="text-gold"/>}
                                <div>
                                    <h1 className="text-gold font-bold text-lg">{role.name}</h1>
                                    <p className="text-[var(--border-ui)] text-sm">Users: {role.usersCount}</p>
                                </div>
                            </div>
                            <button className="hover:opacity-50 cursor-pointer">
                                <Pencil size={20} className="text-gold"/>
                            </button>
                        </div>
                        <div className="h-[2px] bg-[var(--border-panel)]"/>
                        <p className="text-sm">{role.description}</p>
                        <p className="text-[var(--border-ui)] text-sm mt-2">Permissions ({role.permissions.length})</p>
                        <div className="flex flex-wrap gap-2">
                            {role.permissions.slice(0, 3).map(perm => (
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
                ))}
            </div>
        </PageContainer>
    )
}