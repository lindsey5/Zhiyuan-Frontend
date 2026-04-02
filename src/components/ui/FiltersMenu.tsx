import type React from "react";
import { Filter } from "lucide-react";
import { cn } from "../../utils/utils";
import Card from "./Card";

interface FiltersMenuProps {
  children: React.ReactNode;
  className?: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  containerStyle?: string;
}

export default function FiltersMenu({
  children,
  className,
  show,
  setShow,
  containerStyle
}: FiltersMenuProps) {
    return (
        <div className={cn(
            "relative",
            className
        )}>
        <button
            className="p-2 rounded-md"
            onClick={() => setShow((prev) => !prev)}
        >
            <Filter size={20} className={cn(show && "text-gold")} />
        </button>

        <Card
            className={cn(
            "absolute right-0 mt-2 w-56 z-50 transition-all duration-300 ease-in",
            show ? "opacity-100 visible" : "opacity-0 invisible",
            containerStyle
            )}
        >
            {children}
        </Card>
        </div>
    );
}