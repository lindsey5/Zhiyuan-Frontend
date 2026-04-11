import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promiseToast } from "../../utils/sileo";
import TextField from "../ui/TextField";

import { changePasswordSchema, type ChangePasswordInput } from "../../schemas/changePasswordSchema";
import { useUser } from "../../hooks/useUser";
import GoldButton from "../ui/GoldButton";

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

        promiseToast(changePasswordMutate
            .mutateAsync(data))
            .then(() => onClose());
    };

    const isLoading = changePasswordMutate.isPending;

    return (
        <section className="bg-panel rounded-sm border border-panel shadow-panel overflow-hidden mt-6">
            <div className="p-6 flex justify-between items-center bg-black/5 border-b border-panel">
                <div>
                    <h2 className="text-gold font-sans font-bold text-md md:text-lg uppercase tracking-wider">
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
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
                        className="text-sm px-4 py-2 rounded-md border border-[var(--border-panel)] hover:bg-[rgba(166,124,82,0.1)] transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <GoldButton
                        type="submit"
                        disabled={isLoading}
                        className="text-sm"
                    >
                        {isLoading ? "Saving..." : "Update Password"}
                    </GoldButton>
                </div>
            </form>
        </section>
    );
}