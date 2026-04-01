import { cn } from "../../utils/utils";
import Card from "./Card";

interface PageContainerProps { 
    title : string
    description: string
    children : React.ReactNode
    className?: string
}

export default function PageContainer ({ 
    title, 
    className, 
    children,
    description
} : PageContainerProps) {
    
    return (
         <div className={cn(
            "w-full p-3 lg:p-6 flex flex-col space-y-6 relative",
            className
         )}>
            <Card className="space-y-2">
                <h1 className="font-sans text-gold font-bold text-xl lg:text-2xl">{title}</h1>
                <p className="text-sm lg:text-md text-gray">{description}</p>
            </Card>
            {children}
        </div>
    )
}