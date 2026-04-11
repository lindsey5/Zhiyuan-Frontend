import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promiseToast } from "../../utils/sileo";

import TextField from "../ui/TextField";
import Button from "../ui/Button";

import { changePasswordSchema, type ChangePasswordInput } from "../../schemas/changePasswordSchema";
import { useUser } from "../../hooks/useUser";

export default function AccountSecuritySettings({ onClose }: { onClose: () => void }) {
    const { changePasswordMutate } = useUser();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<ChangePasswordInput> = (data) => {
        if (!confirm("Are you sure you want to update your password?")) return;

        const mutationPromise = changePasswordMutate
            .mutateAsync({ payload: data })
            .then(() => ({ message: "Password updated successfully" }));

        promiseToast(mutationPromise, "top-center", "Security Updated")
            .then(() => onClose());
    };

    const isLoading = changePasswordMutate.isPending;

    return (
        <section className="bg-panel rounded-sm border border-panel shadow-panel overflow-hidden mt-6">
            <div className="p-6 flex justify-between items-center bg-black/5 border-b border-panel">
                <div>
                    <h2 className="text-gold font-sans font-bold text-lg uppercase tracking-wider">
                        Change Password
                    </h2>
                    <p className="text-muted text-xs xl:text-sm">
                        Manage your password and account security settings.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <TextField
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                        registration={register("currentPassword")}
                        error={errors.currentPassword?.message}
                        disabled={isLoading}
                    />

                    <div className="hidden md:block" />

                    <TextField
                        label="New Password"
                        type="password"
                        placeholder="Min. 8 characters"
                        registration={register("newPassword")}
                        error={errors.newPassword?.message}
                        disabled={isLoading}
                    />

                    <TextField
                        label="Confirm New Password"
                        type="password"
                        placeholder="Repeat new password"
                        registration={register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                        disabled={isLoading}
                    />
                </div>

                <div className="flex justify-end mt-8 pt-6 gap-2 border-t border-panel/50">
                    <Button
                        type="button"
                        disabled={isLoading}
                        label="Cancel"
                        onClick={onClose}
                        className="bg-transparent border border-panel font-bold px-8 hover:bg-white/5"
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        label={isLoading ? "Saving..." : "Update Password"}
                        className="bg-gold text-black border-none font-bold px-8 hover:opacity-90"
                    />
                </div>
            </form>
        </section>
    );
}