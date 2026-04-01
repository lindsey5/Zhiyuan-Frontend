import PageContainer from "../../components/ui/PageContainer";
import { useRole } from "../../hooks/useRole";
import GoldButton from "../../components/ui/GoldButton";
import RoleCard from "../../components/roles/RoleCard";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";
import RoleCardSkeleton from "../../components/roles/RoleCardSkeleton";

export default function Roles () {
    const accessToken = useAuthStore().accessToken;
    const { getRoles } = useRole();
    const { data, isLoading } = getRoles(accessToken || "");
    const navigate = useNavigate();

    return (
        <PageContainer 
            title="Role Management"
            description="Manage user roles and permissions"
        >
            <div className="w-full flex justify-end">
                <GoldButton className="text-sm text-inverse" onClick={() => navigate('/dashboard/create-role')}>
                    Create Role
                </GoldButton>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {isLoading ? (
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