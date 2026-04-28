import { Search } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import type { SortOption } from "../../types/type";
import { getKeyByValue } from "../../utils/utils";
import TextField from "../ui/TextField";
import type { PaginationState } from "@tanstack/react-table";

const options: Record<string, SortOption> = {
    'Rank - ASCENDING' : { sortBy: 'rank', order: 'asc' },
    'Rank - DESCENDING' : { sortBy: 'rank', order: 'desc' },
    'Quantity Sold - (LOW-HIGH)' : { sortBy: 'totalQuantity', order: 'asc' },
    'Quantity Sold - (HIGH-LOW)' : { sortBy: 'totalQuantity', order: 'desc' },
    'Total Sales - (LOW-HIGH)' : { sortBy: 'totalSales', order: 'asc' },
    'Total Sales - (HIGH-LOW)' : { sortBy: 'totalSales', order: 'desc' },
};

interface DistributorRankingControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>;
    sorting: SortOption;
    searchPlaceHolder?: string;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export default function DistributorRankingControls ({
    setSearch,
    setSorting,
    sorting,
    setPagination
 } : DistributorRankingControlsProps) {

    return (
        <div className="flex gap-3 justify-between items-end px-5">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by distributor name, email or id"
                onChange={(e) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSearch(e.target.value)
                }}
            />
            <Dropdown 
                label="Sort"
                options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                onChange={(value) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSorting(options[value]) 
                }}
                value={getKeyByValue(options, sorting) || ""}
            />
        </div>
    )
}