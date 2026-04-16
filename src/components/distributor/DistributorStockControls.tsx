import type React from "react";
import type { SortOption } from "../../types/type";
import Dropdown from "../ui/Dropdown";
import TextField from "../ui/TextField";
import FiltersMenu from "../ui/FiltersMenu";
import { getKeyByValue } from "../../utils/utils";
import { Search } from "lucide-react";

const options: Record<string, SortOption> = {
    'Newest' : { sortBy: 'updatedAt', order: 'desc' },
    'Oldest' : { sortBy: 'updatedAt', order: 'asc' },
    'A-Z': { sortBy: 'variant_name', order: 'asc' },
    'Z-A': { sortBy: 'variant_name', order: 'desc' },
    'Quantity (ASC)' : { sortBy: 'quantity', order: 'asc' },
    'Quantity (DESC)' : { sortBy: 'quantity', order: 'desc' },
};

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
        <div className="px-5 flex items-center md:items-end justify-between gap-5">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by variant, sku or product name..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <FiltersMenu className="md:hidden" containerStyle="w-[80vw] space-y-3">
                <h1 className="font-bold text-md md:text-lg">Filter</h1>
                <Dropdown 
                    label="Sort"
                    options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                    onChange={(value) => 
                        setSorting(options[value])
                    }
                    value={getKeyByValue(options, sorting) || ""}
                />
            </FiltersMenu>
            <Dropdown 
                className="max-w-60 w-[40%] hidden md:block"
                label="Sort"
                options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                onChange={(value) => setSorting(options[value]) }
                value={getKeyByValue(options, sorting) || ""}
            />
        </div>
    )
}