import type React from "react";
import type { SortOption } from "../../types/type";
import Dropdown from "../ui/Dropdown";
import CategoryDropdown from "../ui/CategoryDropdown";
import FiltersMenu from "../ui/FiltersMenu";
import { getKeyByValue } from "../../utils/utils";
import TextField from "../ui/TextField";
import { Search } from "lucide-react";
import type { PaginationState } from "@tanstack/react-table";

const options: Record<string, SortOption> = {
    'Newest': { sortBy: 'createdAt', order: 'desc' },
    'Oldest': { sortBy: 'createdAt', order: 'asc' },
    'A-Z': { sortBy: 'variant_name', order: 'asc' },
    'Z-A': { sortBy: 'variant_name', order: 'desc' },
};

interface VariantsTableControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>
    sorting: SortOption
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
}

export default function VariantsTableControls ({
    setSearch,
    setSorting,
    sorting,
    category,
    setCategory,
    setPagination
} : VariantsTableControlsProps) {
    
    return (
        <div className="px-5 flex items-center justify-between gap-5">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by variant, product name or sku..."
                onChange={(e) => {
                    setPagination(prev => ({ ...prev, pageIndex: 0 }))
                    setSearch(e.target.value);
                }}
            />
            <FiltersMenu className="md:hidden" containerStyle="space-y-3 w-[60vw]">
                <h1 className="font-bold text-md md:text-lg">Filter</h1>
                <Dropdown 
                    label="Sort"
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
            <div className="max-w-100 w-[40%] hidden md:flex items-center space-x-3">
                <Dropdown 
                    className="flex-1"
                    label="Sort"
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