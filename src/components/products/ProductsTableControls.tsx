import type React from "react";
import type { SortOption } from "../../types/type";
import Dropdown from "../ui/Dropdown";
import { SearchField } from "../ui/TextField";
import CategoryDropdown from "../ui/CategoryDropdown";
import FiltersMenu from "../ui/FiltersMenu";

const options: Record<string, SortOption> = {
    'Newest': { sortBy: 'createdAt', order: 'desc' },
    'Oldest': { sortBy: 'createdAt', order: 'asc' },
    'A-Z': { sortBy: 'product_name', order: 'asc' },
    'Z-A': { sortBy: 'product_name', order: 'desc' },
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

interface ProductsTableControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>
    sorting: SortOption
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function ProductsTableControls ({
    setSearch,
    setSorting,
    sorting,
    category,
    setCategory
} : ProductsTableControlsProps) {

    return (
        <div className="px-5 flex items-center justify-between gap-5">
            <div className="w-full md:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by product name..."
                />
            </div>
            <FiltersMenu className="md:hidden">
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
            <div className="max-w-100 w-[40%] hidden md:flex items-center space-x-3 flex-wrap">
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