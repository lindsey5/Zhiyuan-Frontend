import type React from "react";
import type { SortOption } from "../../types/type";
import Dropdown from "../ui/Dropdown";
import { SearchField } from "../ui/TextField";
import FiltersMenu from "../ui/FiltersMenu";

const options: Record<string, SortOption> = {
    'Newest' : { sortBy: 'updatedAt', order: 'desc' },
    'Oldest' : { sortBy: 'updatedAt', order: 'asc' },
    'A-Z': { sortBy: 'variant_name', order: 'asc' },
    'Z-A': { sortBy: 'variant_name', order: 'desc' },
    'Quantity (ASC)' : { sortBy: 'quantity', order: 'asc' },
    'Quantity (DESC)' : { sortBy: 'quantity', order: 'desc' },
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

interface DistributorStockControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>
    sorting: SortOption
}

export default function DistributorStockControls ({
    setSearch,
    setSorting,
    sorting,
} : DistributorStockControlsProps) {

    return (
        <div className="px-5 flex items-end justify-between gap-5">
            <div className="w-full md:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by variant, sku or product name..."
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
            </FiltersMenu>
            <Dropdown 
                className="max-w-60 w-[40%] hidden md:block"
                title="Sort"
                options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                onChange={(value) => setSorting(options[value]) }
                value={getKeyByValue(options, sorting) || ""}
            />
        </div>
    )
}