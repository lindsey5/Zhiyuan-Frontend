import Card from "../../components/ui/Card";
import { useAuthStore } from "../../lib/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type UserFormData } from "../../schemas/userSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { sileo } from "sileo";
import GoldButton from "../../components/ui/GoldButton";

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
    }, [user])

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        console.log(data)
        sileo.promise(updateOwn.mutateAsync(data), {
            position: "top-center",
            loading: { title: "Loading..." },
            success: { title: "Sucessfully Updated." },
            error: (err : any) =>  ({ title:  err.message }),
        });
    }

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

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="font-sans">Firstname</span>
                            <input 
                                disabled={updateOwn.isPending}
                                {...register("firstname")}
                                placeholder="Firstname" 
                                className="w-full p-3 bg-input-ui border border-ui rounded-sm font-sans text-primary outline-none focus:border-gold transition-all"
                            />
                            {errors.firstname && <p className="text-red-500 text-[10px] font-serif uppercase">{errors.firstname.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <span className="font-sans">Lastname</span>
                            <input 
                                disabled={updateOwn.isPending}
                                {...register("lastname")}
                                placeholder="Lastname" 
                                className="w-full p-3 bg-input-ui border border-ui rounded-sm font-sans text-primary outline-none focus:border-gold transition-all"
                            />
                            {errors.lastname && <p className="text-red-500 text-[10px] font-serif uppercase">{errors.lastname.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <span className="font-sans">Email</span>
                            <input 
                                disabled={updateOwn.isPending}
                                {...register("email")}
                                placeholder="Email" 
                                className="w-full p-3 bg-input-ui border border-ui rounded-sm font-sans text-primary outline-none focus:border-gold transition-all"
                            />
                            {errors.email && <p className="text-red-500 text-[10px] font-serif uppercase">{errors.email.message}</p>}
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
                            className="px-4 py-2 rounded-md border border-[var(--border-panel)] hover:bg-[rgba(166,124,82,0.1)] transition"
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
        </div>
    );
}