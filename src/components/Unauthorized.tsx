import Card from "./ui/Card";
import { Lock } from "lucide-react";

export default function Unauthorized ({ children } : { children : React.ReactNode }) {
    
    return (
        <div className='relative w-full h-screen'>
            <div className="z-1 absolute inset-0 flex items-center justify-center">
                <Card className="p-10 flex flex-col items-center gap-4 shadow-xl">
                    <Lock size={60} className="text-gold" />

                    <h1 className="text-xl font-bold text-primary">
                    Access Restricted
                    </h1>

                    <p className="text-gray-400 text-center">
                    You don’t have permission to view this content.
                    </p>
                </Card>
            </div>
            <div className="blur-md pointer-events-none select-none">
                {children}
            </div>
        </div>
    )
}