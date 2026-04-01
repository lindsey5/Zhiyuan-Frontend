import { useForm, type SubmitHandler } from "react-hook-form";
import TextField from "../../components/ui/TextField";
import ToggleButton from "../../components/ui/ToggleButton";
import { useDistributorAuth } from "../../hooks/useDistributorAuth";
import { useDistributorAuthStore } from "../../lib/store/distributorAuthStore";
import { useThemeStore } from "../../lib/store/themeStore";
import { loginSchema, type LoginFormData } from "../../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../lib/store/authStore";

export default function DistributorLogin () {
    const { isDark } = useThemeStore();
    const { login } = useDistributorAuth();
    const errorMessage =login.isError && login.error.message;
    const { isAuthenticated : isDistributorAuthenticated } = useDistributorAuthStore();
    const { isAuthenticated : isUserAuthenticated } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        login.mutate(data);
    };

    if(isDistributorAuthenticated()) return <Navigate to="/distributor" />
    if(isUserAuthenticated()) return <Navigate to="/dashboard" />

    return (
        <div 
            className="relative flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-500 bg-main bg-cover bg-center"
            style={{ backgroundImage: `url(${isDark ? '/dark-bg.jpg' : '/light-bg.jpg'})` }}
        >
            <ToggleButton className="absolute top-8 right-8"/>
            <header className="flex flex-col items-center mb-10 text-center leading-0.1">
                <div className="w-48 h-48">
                <img 
                    src={isDark ? "/light-logo.png" : "/dark-logo.png"} 
                    alt="Zhiyuan Logo" 
                    className="w-full h-full object-contain transition-opacity duration-500" 
                />
                </div>
                <div className="font-sans text-gold text-4xl uppercase leading-tight text-center tracking-tighter">
                    <h1 
                        className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-transparent bg-clip-text"
                    >
                        Distributor Login
                    </h1>                    
                </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs space-y-4">
                {errorMessage && <p className="text-red-500 text-[10px] font-serif uppercase text-center">{errorMessage}</p>}

                <div className="space-y-1">
                    <TextField
                        placeholder="Email"
                        registration={register("email")}
                        error={errors.email?.message}
                    />
                </div>

                <div className="space-y-1">
                    <TextField
                        type="password"
                        placeholder="Password"
                        registration={register("password")}
                        error={errors.password?.message}
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-b from-[#c59d5f] to-[#a67c52] text-white font-sans font-bold tracking-[0.2em] rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-2xl uppercase"
                >
                    Login
                </button>
            </form>
        </div>
    )
}