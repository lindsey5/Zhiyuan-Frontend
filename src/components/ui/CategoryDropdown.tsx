import type React from "react";
import { useCategory } from "../../hooks/useCategory";
import Dropdown from "./Dropdown";

interface CategoryDropdownProps {
    category: string;
    className?: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryDropdown ({ className, category, setCategory } : CategoryDropdownProps) {
    const { getCategories } = useCategory();
    const { data } = getCategories({});

    return (
        <Dropdown 
            className={className}
            label="Category"
            value={category}
            onChange={setCategory}
            options={
                [   { label: 'All', value: 'All'}, 
                    ...(data?.categories.map(category => ({ 
                        label: category.name, 
                        value: category.name
                    })) || [])
                ]

            }
        />
    )
}