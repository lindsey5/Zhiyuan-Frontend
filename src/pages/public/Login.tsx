import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeStore } from '../../store/themeStore';
import { loginSchema, type LoginFormData } from '../../schemas/authSchema';
import ToggleButton from '../../components/ToggleButton';
import TaperedLine from '../../components/Lines';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../store/authStore';

const LoginPage: React.FC = () => {
    const { isDark } = useThemeStore();
    const { login } = useAuth();

    const {
        email,
        password,
        setCredentials,
        errorMessage,
    } = useAuthStore();

    const { handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = () => {
        login.mutate({
            email,
            password,
        });
    };

    return (
        <div 
            className="relative flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-500 bg-main bg-cover bg-center"
            style={{ backgroundImage: `url(${isDark ? '/dark-bg.jpg' : '/light-bg.jpg'})` }}
        >
            <ToggleButton />

            <header className="flex flex-col items-center mb-10 text-center leading-0.1">
                <div className="w-56 h-56">
                    <img 
                        src={isDark ? "/light-logo.png" : "/dark-logo.png"} 
                        alt="Zhiyuan Logo" 
                        className="w-full h-full object-contain transition-opacity duration-500" 
                    />
                </div>

                <div className="font-primary text-gold text-4xl uppercase leading-tight text-center tracking-tighter">
                    <h1 className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-transparent bg-clip-text">
                        Zhiyuan Enterprise
                    </h1>                    
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <TaperedLine direction="right" className="w-32" />                        
                        <span className="text-lg whitespace-nowrap">Group Inc</span>
                        <TaperedLine direction="left" className="w-32" />                    
                    </div>
                </div>

                <p className="font-secondary text-primary text-[10px] tracking-[0.4em] uppercase mt-4 opacity-70">
                    Admin Panel Access
                </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs space-y-4">

                {/* ✅ GLOBAL ERROR MESSAGE */}
                {errorMessage && (
                    <p className="text-red-500 text-xs text-center font-secondary uppercase">
                        {errorMessage}
                    </p>
                )}

                {/* EMAIL */}
                <div className="space-y-1">
                    <input 
                        value={email}
                        onChange={(e) => setCredentials(e.target.value, password)}
                        placeholder="Email" 
                        className="w-full p-3 bg-input-ui border border-ui rounded-sm font-secondary text-primary outline-none focus:border-gold transition-all"
                    />
                </div>

                {/* PASSWORD */}
                <div className="space-y-1">
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setCredentials(email, e.target.value)}
                        placeholder="Password" 
                        className="w-full p-3 bg-input-ui border border-ui rounded-sm font-secondary text-primary outline-none focus:border-gold transition-all"
                    />
                </div>

                {/* BUTTON */}
                <button 
                    type="submit" 
                    disabled={login.isPending}
                    className="w-full py-3 bg-gradient-to-b from-[#c59d5f] to-[#a67c52] text-white font-primary font-bold tracking-[0.2em] rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-2xl uppercase disabled:opacity-50"
                >
                    {login.isPending ? "Logging in..." : "Login"}
                </button>
            </form>

            <div className="text-center mt-12">
                <TaperedLine direction="center" className="w-100" />
                <h3 className='font-secondary font-extralight text-primary text-[12px] tracking-[0.1rem] uppercase opacity-30 mt-10'>
                    Restricted Access Admin Only
                </h3>
            </div>
        </div>
    );
};

export default LoginPage;