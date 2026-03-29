import { cn } from "../../utils/utils";
import Card from "./Card";
import ToggleButton from "./ToggleButton";

interface PageContainerProps { 
    title : string
    children : React.ReactNode
    className?: string
}

export default function PageContainer ({ 
    title, 
    className, 
    children 
} : PageContainerProps) {
    
    return (
         <div className={cn(
            "w-full p-6 flex flex-col space-y-6 relative",
            className
         )}>
            <Card className="flex items-center justify-between">
                <h1 className="font-sans text-gold font-bold text-2xl">{title}</h1>
                <ToggleButton />
            </Card>
            {children}
        </div>
    )
}