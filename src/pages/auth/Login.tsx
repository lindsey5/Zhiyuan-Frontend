import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeStore } from '../../lib/store/themeStore';
import { loginSchema, type LoginFormData } from '../../schemas/authSchema';
import { useAuth } from '../../hooks/useAuth';
import ToggleButton from '../../components/ui/ToggleButton';
import TaperedLine from '../../components/ui/Lines';
import { useAuthStore } from '../../lib/store/authStore';
import { Navigate } from 'react-router-dom';
import TextField from '../../components/ui/TextField';

const LoginPage: React.FC = () => {
    const { isDark } = useThemeStore();

    const { login } = useAuth();
    const { errorMessage, isAuthenticated } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        login.mutate(data);
    };

    if(isAuthenticated()) return <Navigate to="/dashboard" />

    return (
        <div 
            className="relative flex flex-col items-center justify-center min-h-screen p-6 transition-all duration-500 bg-main bg-cover bg-center"
            style={{ backgroundImage: `url(${isDark ? '/dark-bg.jpg' : '/light-bg.jpg'})` }}
        >
            <ToggleButton className="absolute top-8 right-8"/>

            <header className="flex flex-col items-center mb-10 text-center leading-0.1">
                <div className="w-56 h-56">
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
                        Zhiyuan Enterprise
                    </h1>                    
                    <div className="flex items-center justify-center gap-4 mt-2">
                        <TaperedLine direction="right" className="w-32" />                        
                        <span className="text-lg whitespace-nowrap">Group Inc</span>
                        <TaperedLine direction="left" className="w-32" />                    
                    </div>
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
            
            <div className="text-center mt-12">
                <TaperedLine direction="center" className="w-100" />
                <h3 className='font-serif font-extralight text-yellow-500 text-[12px] tracking-[0.1rem] uppercase opacity-30 mt-10'>
                    Restricted Access Only
                </h3>
            </div>
        </div>
    );
};

export default LoginPage;