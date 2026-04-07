import { X } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import type { GetUser } from "../../types/user.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CreateUserSchema, UpdateUserSchema, type CreateUserFormData, type UpdateUserFormData } from "../../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../ui/TextField";
import { useUser } from "../../hooks/useUser";
import GoldButton from "../ui/GoldButton";
import { useEffect } from "react";
import { promiseToast } from "../../utils/sileo";
import { useRole } from "../../hooks/useRole";
import Dropdown from "../ui/Dropdown";
import { checkIfEmailExist } from "../../utils/validation";

interface UserModalProps {
    open: boolean;
    user?: GetUser;
    onClose: () => void
}

type UserFormData = CreateUserFormData | UpdateUserFormData

export default function UserModal ({ open, user, onClose } : UserModalProps) {

    const { createUser, updateUser } = useUser();

    const { getRoles } = useRole();
    const { data } = getRoles();

    const { 
        register, 
        handleSubmit, 
        formState: { errors}, 
        reset, 
        setValue,
        watch,
        setError,
        clearErrors
    } = useForm<UserFormData>({
        resolver: zodResolver(user ? UpdateUserSchema : CreateUserSchema)
    })
    
    const onSubmit : SubmitHandler<UserFormData> = async (data) => {
        const isConfirm = confirm(
            user
            ? "Are you sure you want to update this user?"
            : "Are you sure you want to create this user?"
        );

        if (!isConfirm) return;

        const isEmailExist = await checkIfEmailExist(
            setError,
            clearErrors,
            data.email,
            user?._id
        )

        if(isEmailExist) return

        const callBack = user ? 
            updateUser.mutateAsync({ 
                id: user._id, 
                payload: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password,
                    role_id: data.role_id
                }
            }) : 
            createUser.mutateAsync({ 
                payload: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password || "",
                    role_id: data.role_id
                }
            });
        promiseToast(callBack)
    }

    const close = () => {
        onClose();
        reset({
            firstname: undefined,
            lastname: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            role_id: ""
        })
    }

    useEffect(() => {
        if(user) reset({ 
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role_id: user.role_id
         })
    }, [user])

    return (
        <Modal
            onClose={close}
            open={open}
            className="w-[90%] md:max-w-150"
        >
            <Card className="w-full max-h-[90vh] relative overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold font-sans">{user ? 'Edit' : 'Add'} User</h2>
                    <Button 
                        className="border-none p-0"
                        icon={<X size={20}/>}
                        onClick={close}
                    />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-4"> 
                        <TextField 
                            label="Firstname"
                            error={errors.firstname?.message}
                            placeholder="Enter firstname"
                            registration={register('firstname')}
                            disabled={createUser.isPending || updateUser.isPending}
                        />
                        <TextField 
                            label="Lastname"
                            error={errors.lastname?.message}
                            placeholder="Enter lastname"
                            registration={register('lastname')}
                            disabled={createUser.isPending || updateUser.isPending}
                        />
                    </div>
                    <TextField 
                        label="Email"
                        error={errors.email?.message}
                        placeholder="Enter email"
                        disabled={createUser.isPending || updateUser.isPending}
                        registration={register('email')}
                    />
                    <div className="flex flex-col md:flex-row gap-4"> 
                        <TextField 
                            label={`Password ${user ? '(Optional)' : ''}`}
                            type="password"
                            error={errors.password?.message}
                            placeholder="Enter password"
                            disabled={createUser.isPending || updateUser.isPending}
                            registration={register('password')}
                        />
                        <TextField 
                            label={`Confirm Password ${user ? '(Optional)' : ''}`}
                            type="password"
                            error={errors.confirmPassword?.message}
                            placeholder="Confirm Password"
                            disabled={createUser.isPending || updateUser.isPending}
                            registration={register('confirmPassword')}
                        />
                    </div>
                        <Dropdown 
                            label="Role"
                            className="h-16"
                            options={data?.roles.map(role => ({ label: role.name, value: role._id})) || []}
                            onChange={(value) => setValue("role_id", value)}
                            value={watch('role_id')}
                            error={errors.role_id?.message}
                        />
                    <div className="flex justify-end gap-3 pt-3">
                        <GoldButton
                            type="submit"
                            className="text-sm"
                            disabled={createUser.isPending || updateUser.isPending}
                        >{user ? 'Save changes' : 'Create'}</GoldButton>
                    </div>
                </form>

            </Card>
        </Modal>
    )
}