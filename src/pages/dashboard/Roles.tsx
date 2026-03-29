import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import GoldButton from "../../components/ui/GoldButton";
import RoleCard from "../../components/roles/RoleCard";

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
                    <RoleCard role={role}/>
                ))}
            </div>
        </PageContainer>
    )
}