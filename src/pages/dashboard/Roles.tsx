import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import GoldButton from "../../components/ui/GoldButton";
import RoleCard from "../../components/roles/RoleCard";
import { useNavigate } from "react-router-dom";
import RoleCardSkeleton from "../../components/roles/RoleCardSkeleton";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";

export default function Roles () {
    const { getRoles } = useRole();
    const { data, isFetching } = getRoles();
    const navigate = useNavigate();
    const { hasPermissions } = usePermissions();
    const hasCreatePermission = hasPermissions([PERMISSIONS.ROLE_CREATE]);

    return (
        <PageContainer 
            title="Role Management"
            description="Manage user roles and permissions"
        >
            {hasCreatePermission && 
                <div className="w-full flex justify-end">
                    <GoldButton className="text-sm text-inverse" onClick={() => navigate('/dashboard/create-role')}>
                        Create Role
                    </GoldButton>
                </div>
            }
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {isFetching ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <RoleCardSkeleton key={index} />
                    ))
                ) : (
                    data?.roles?.map(role => (
                        <RoleCard key={role._id} role={role} navigateTo={navigate}/>
                    ))
                )}
            </div>
        </PageContainer>
    )
}