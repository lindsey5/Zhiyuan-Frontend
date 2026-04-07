import React, { useState } from "react";
import Card from "./Card";
import { cn } from "../../utils/utils";

interface TabsItem {
    onClick: () => any;
    icon: React.ReactNode;
    label: string;
}

interface TabsProps {
    items: TabsItem[];
    defaultActive?: number;
    className?: string;
}

export default function Tabs({ items, defaultActive = 0, className }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(defaultActive);

    const handleClick = (item: TabsItem, index: number) => {
        setActiveIndex(index);
        item.onClick();
    };

    return (
        <Card className={cn(
            "min-h-15 rounded-full p-2 flex gap-2 relative overflow-hidden",
            className
        )}>
            {items.map((item, index) => (
                <button
                key={index}
                onClick={() => handleClick(item, index)}
                className={cn(
                    "rounded-full relative cursor-pointer flex items-center gap-2 px-4 py-3 text-sm font-medium transition",
                    activeIndex === index ? "bg-gold text-inverse font-bold" : "hover:text-gold"   
                )}>
                {item.icon}
                <span>{item.label}</span>
                </button>
            ))}
        </Card>
    );
}