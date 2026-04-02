import type React from "react";
import type { SortOption } from "../../types/type";
import Dropdown from "../ui/Dropdown";
import { SearchField } from "../ui/TextField";
import CategoryDropdown from "../ui/CategoryDropdown";
import { useState } from "react";
import FiltersMenu from "../ui/FiltersMenu";

const options: Record<string, SortOption> = {
    'Newest': { sortBy: 'createdAt', order: 'DESC' },
    'Oldest': { sortBy: 'createdAt', order: 'ASC' },
    'A-Z': { sortBy: 'variant_name', order: 'ASC' },
    'Z-A': { sortBy: 'variant_name', order: 'DESC' },
};

function getKeyByValue(
    obj: Record<string, SortOption>,
    target: SortOption
) {
    return Object.keys(obj).find(key => {
        const value = obj[key]
        return (
            value.sortBy === target.sortBy &&
            value.order === target.order
        )
    })
}

interface VariantsTableControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>
    sorting: SortOption
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function VariantsTableControls ({
    setSearch,
    setSorting,
    sorting,
    category,
    setCategory
} : VariantsTableControlsProps) {
    const [showFilter, setShowFilter] = useState(false);
    
    return (
        <div className="px-5 flex items-center justify-between gap-5">
            <div className="w-full lg:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by variant, product or sku..."
                />
            </div>
            <FiltersMenu 
                className="lg:hidden"
                setShow={setShowFilter}
                show={showFilter}
            >
                <Dropdown 
                    title="Sort"
                    options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                    onChange={(value) => 
                        setSorting(options[value])
                    }
                    value={getKeyByValue(options, sorting) || ""}
                />
                <CategoryDropdown 
                    category={category}
                    setCategory={setCategory}
                />
            </FiltersMenu>
            <div className="w-[30%] hidden lg:flex items-center space-x-3">
                <Dropdown 
                    className="flex-1"
                    title="Sort"
                    options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                    onChange={(value) => 
                        setSorting(options[value])
                    }
                    value={getKeyByValue(options, sorting) || ""}
                />
                <CategoryDropdown 
                    className="flex-1"
                    category={category}
                    setCategory={setCategory}
                />

            </div>
        </div>
    )
}