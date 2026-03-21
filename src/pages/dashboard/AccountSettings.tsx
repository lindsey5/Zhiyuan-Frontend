import Card from "../../components/ui/Card";
import { useAuthStore } from "../../lib/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type UserFormData } from "../../schemas/userSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import GoldButton from "../../components/ui/GoldButton";
import TextField from "../../components/ui/TextField";
import { promiseToast } from "../../utils/sileo";
import { type UserResponse } from "../../types/user.type";
import AccountPermissions from "../../components/settings/AccountPermissions";

export default function AccountSettings() {
    const { user } = useAuthStore();
    const { updateOwn } = useUser();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(UserSchema),
    });

    useEffect(() => {
        if(user) reset({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
    }, [])

    const onSubmit: SubmitHandler<UserFormData> = (data) => promiseToast<UserResponse>(updateOwn.mutateAsync(data))

    return (
        <div className="w-full p-10 space-y-6">

            {/* Header */}
            <Card>
                <h1 className="font-sans text-gold font-bold text-2xl">
                    Account Settings
                </h1>
            </Card>

            {/* Profile Info */}
            <Card>
                <h2 className="font-sans text-lg text-gold mb-4 font-semibold">
                    Profile Information
                </h2>

                <div className="">
        
                </div>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <TextField
                                label="Firstname"
                                placeholder="e.g. John"
                                registration={register("firstname")}
                                error={errors.firstname?.message}
                                disabled={updateOwn.isPending}
                            />
                        </div>

                        <div className="space-y-1">
                            <TextField
                                label="Lastname"
                                placeholder="e.g. Doe"
                                registration={register("lastname")}
                                error={errors.lastname?.message}
                                disabled={updateOwn.isPending}
                            />
                        </div>

                        <div className="space-y-1">
                            <TextField
                                label="Email"
                                type="email"
                                placeholder="name@example.com"
                                registration={register("email")}
                                error={errors.email?.message}
                                disabled={updateOwn.isPending}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-5">
                        <button
                            type="button"
                            disabled={updateOwn.isPending}
                            onClick={() => reset({
                                firstname: user?.firstname,
                                lastname: user?.lastname,
                                email: user?.email
                            })}
                            className="px-4 py-2 rounded-md border border-[var(--border-panel)] hover:bg-[rgba(166,124,82,0.1)] transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <GoldButton
                            type="submit"
                            disabled={updateOwn.isPending}
                        >{updateOwn.isPending ? 'Saving...' : 'Save Changes'}</GoldButton>
                    </div>
                </form>
            </Card>
            <AccountPermissions />
        </div>
    );
}