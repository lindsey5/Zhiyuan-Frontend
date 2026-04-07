import { Search } from "lucide-react";
import FiltersMenu from "../ui/FiltersMenu";
import DateInput from "../ui/DateInput";
import Dropdown from "../ui/Dropdown";
import type { SortOption } from "../../types/type";
import { getKeyByValue } from "../../utils/utils";
import TextField from "../ui/TextField";

const options: Record<string, SortOption> = {
    'Newest' : { sortBy: 'createdAt', order: 'desc' },
    'Oldest' : { sortBy: 'createdAt', order: 'asc' },
    'Sales (HIGH - LOW)': { sortBy: 'total_amount', order: 'desc' },
    'Sales (LOW - HIGH)': { sortBy: 'total_amount', order: 'asc' },
    'Quantity (ASC)' : { sortBy: 'quantity', order: 'asc' },
    'Quantity (DESC)' : { sortBy: 'quantity', order: 'desc' },
};

interface DistributorSalesControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    sorting: SortOption;
    searchPlaceHolder?: string;
}

export default function DistributorSalesControls ({
    setSearch,
    setSorting,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sorting,
    searchPlaceHolder,
 } : DistributorSalesControlsProps) {

    const clear = () => {
        setSorting({ order: 'desc', sortBy: 'createdAt' });
        setStartDate('');
        setEndDate('');
    }

    return (
        <div className="flex gap-3 items-center px-5">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder={searchPlaceHolder ? searchPlaceHolder : "Search by seller, item name, or sku..."}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FiltersMenu containerStyle="space-y-3 w-[80vw] md:w-90">
                <h1 className="font-bold text-md md:text-lg">Filter</h1>
                <div className="grid grid-cols-2 gap-3 ">
                    <DateInput 
                        label="From"
                        onChange={setStartDate}
                        value={startDate}
                    />
                    <DateInput 
                        label="To"
                        onChange={setEndDate}
                        value={endDate}
                    />
                    <Dropdown 
                        label="Sort"
                        options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                        onChange={(value) => setSorting(options[value]) }
                        value={getKeyByValue(options, sorting) || ""}
                    />
                </div>
                <div className="flex justify-end">
                    <button 
                        className="cursor-pointer hover:text-gold text-sm md:text-sm"
                        onClick={clear}
                    >Clear</button>
                </div>
            </FiltersMenu>
        </div>
    )
}