import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../hooks/useUser";
import { useAuthStore } from "../../lib/store/authStore";
import Card from "../ui/Card"
import TextField from "../ui/TextField"
import { UserSchema, type UserFormData } from "../../schemas/userSchema";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { promiseToast } from "../../utils/sileo";
import GoldButton from "../ui/GoldButton";
import Button from "../ui/Button";
import { Edit } from "lucide-react";

export default function AccountSettingsForm () {
    const { user } = useAuthStore();
    const [editMode, setEditMode] = useState(false);
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

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        const isConfirm = confirm("Are you sure you want to update your profile information?");
        if(!isConfirm) return;

        promiseToast(updateOwn.mutateAsync({ 
            payload: data
        })).then(() => setEditMode(false));
    }

    const cancel = () => {
        reset({
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email
        })

        setEditMode(false);
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-sans text-lg text-gold font-semibold">
                    Profile Information
                </h2>
                {!editMode && (
                    <Button 
                        label="Edit"
                        onClick={() => setEditMode(true)}
                        className="text-gold text-md border-none"
                        icon={<Edit size={20} />}
                    />
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <TextField
                            label="Firstname"
                            placeholder="e.g. John"
                            registration={register("firstname")}
                            error={errors.firstname?.message}
                            disabled={updateOwn.isPending || !editMode}
                        />
                    </div>

                    <div className="space-y-1">
                        <TextField
                            label="Lastname"
                            placeholder="e.g. Doe"
                            registration={register("lastname")}
                            error={errors.lastname?.message}
                            disabled={updateOwn.isPending || !editMode}
                        />
                    </div>

                    <div className="space-y-1">
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="name@example.com"
                            registration={register("email")}
                            error={errors.email?.message}
                            disabled={updateOwn.isPending || !editMode}
                        />
                    </div>
                </div>
                {editMode && <div className="flex justify-end gap-3 mt-5">
                    <button
                        type="button"
                        disabled={updateOwn.isPending}
                        onClick={cancel}
                        className="px-4 py-2 rounded-md border border-[var(--border-panel)] hover:bg-[rgba(166,124,82,0.1)] transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <GoldButton
                        type="submit"
                        disabled={updateOwn.isPending}
                    >{updateOwn.isPending ? 'Saving...' : 'Save Changes'}</GoldButton>
                </div>}
            </form>
        </Card>
    )
}