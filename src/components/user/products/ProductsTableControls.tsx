import type React from "react";
import type { SortOption } from "../../../types/type";
import Dropdown from "../../ui/Dropdown";
import { SearchField } from "../../ui/TextField";
import CategoryDropdown from "./CategoryDropdown";

const options: Record<string, SortOption> = {
    'Newest': { sortBy: 'createdAt', order: 'DESC' },
    'Oldest': { sortBy: 'createdAt', order: 'ASC' },
    'A-Z': { sortBy: 'product_name', order: 'ASC' },
    'Z-A': { sortBy: 'product_name', order: 'DESC' },
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
        <div className="px-5 flex items-center justify-between flex-wrap gap-5">
            <div className="w-full lg:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by product name..."
                />
            </div>
            <div className="flex items-center space-x-3">
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

            </div>
        </div>
    )
}