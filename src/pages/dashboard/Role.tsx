import { useForm, type SubmitHandler } from "react-hook-form";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import TextField from "../../components/ui/TextField";
import { useRole } from "../../hooks/useRole";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RoleFormData, roleSchema } from "../../schemas/roleSchema";
import { getPermissionKey, PERMISSION_DESCRIPTIONS, PERMISSIONS } from "../../config/permission";
import PermissionsContainer from "../../components/role/PermissionsContainer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";
import { promiseToast } from "../../utils/sileo";
import GoldButton from "../../components/ui/GoldButton";

function CategorizedPermissions () {
    const result: Record<string, { description: string, value: string}[]> = {};
    
    Object.values(PERMISSIONS).forEach((perm) => {
        for (const [category, perms] of Object.entries(PERMISSION_DESCRIPTIONS)) {
            const permissionKey = getPermissionKey(perm) || "";

            if (permissionKey in perms) {
                if (!result[category]) result[category] = [];

                result[category].push({
                    description: perms[permissionKey as keyof typeof perms],
                    value: perm
                });
            }
        }
    });

    return result;
}

export default function Role ({ title, description } : { title : string, description : string}) {
     const params = useParams();
    const id = params.id;
    const accessToken = useAuthStore(state => state.accessToken);
    
    const { createRole,  getRoleById, updateRole } =  useRole();
    const { data, isSuccess } = getRoleById(Number(id), accessToken || "");

    const { register, handleSubmit, watch, setValue, reset, formState: { errors} } = useForm<RoleFormData>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: '',
            description: '',
            permissions: []
        }
    });

    useEffect(() => {
        if(isSuccess && data.role) {
            reset({
                name: data.role.name,
                description: data.role.description,
                permissions: data.permissions
            })
        }
    }, [data])

    const onSubmit: SubmitHandler<RoleFormData> = (data) => {
        const isConfirm = confirm(
            id
            ? "Are you sure you want to update this role?"
            : "Are you sure you want to create this role?"
        );

        if (!isConfirm) return;
        
        if(id){
            promiseToast(updateRole.mutateAsync({ 
                id: Number(id),
                payload: data,
                accessToken: accessToken || ""
            }))
            
        }else {
            promiseToast(createRole.mutateAsync({ 
                payload: data,
                accessToken: accessToken || ""
            }))
        }
    }

    return (
        <PageContainer title={title} description={description}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

                <Card>
                    <h1 className="text-xl font-bold pb-4 border-b border-[var(--color-gray)]">Role Details</h1>
                    <div className="flex gap-10 mt-4">
                        <TextField 
                            label="Name"
                            registration={register("name")}
                            placeholder="Enter role name"
                        />
                        <TextField 
                            label="Description"
                            registration={register("description")}
                            placeholder="Enter role description"
                        />
                    </div>
                </Card>

                <Card className="space-y-5">
                    <h1 className="text-xl font-bold pb-4 border-b border-[var(--color-gray)]">Role Permissions</h1>
                    {errors.permissions && <span className="text-xs text-red-500">{errors.permissions.message}</span>}
                    {Object.entries(CategorizedPermissions()).map(([category, perms]) => (
                        <PermissionsContainer 
                            key={category}
                            category={category} 
                            watch={watch}
                            setValue={setValue}
                            permissions={perms}
                        />
                    ))}
                </Card>
                <div className="flex justify-end">
                    <GoldButton type="submit">
                        {id ? 'Update Role' : 'Create Role'}
                    </GoldButton>
                </div>
            </form>
        </PageContainer>
    )
}