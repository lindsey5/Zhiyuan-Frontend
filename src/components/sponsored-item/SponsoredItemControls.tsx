import { Search } from "lucide-react";
import FiltersMenu from "../ui/FiltersMenu";
import DateInput from "../ui/DateInput";
import Dropdown from "../ui/Dropdown";
import type { SortOption } from "../../types/type";
import { getKeyByValue } from "../../utils/utils";
import TextField from "../ui/TextField";
import type { PaginationState } from "@tanstack/react-table";

const options: Record<string, SortOption> = {
    'Newest' : { sortBy: 'createdAt', order: 'desc' },
    'Oldest' : { sortBy: 'createdAt', order: 'asc' },
    'Quantity (ASC)' : { sortBy: 'quantity', order: 'asc' },
    'Quantity (DESC)' : { sortBy: 'quantity', order: 'desc' },
};

interface SponsoredItemControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setSorting: React.Dispatch<React.SetStateAction<SortOption>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    sorting: SortOption;
    searchPlaceHolder?: string;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export default function SponsoredItemControls ({
    setSearch,
    setSorting,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sorting,
    searchPlaceHolder,
    setPagination
 } : SponsoredItemControlsProps) {

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
                placeholder={searchPlaceHolder ? searchPlaceHolder : "Search by product or variant"}
                onChange={(e) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSearch(e.target.value);
                }}
            />
            <FiltersMenu containerStyle="space-y-3 w-[80vw] md:w-90">
                <h1 className="font-bold text-md md:text-lg">Filter</h1>
                <div className="grid grid-cols-2 gap-3 ">
                    <DateInput 
                        label="From"
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}));
                            setStartDate(value);
                        }}
                        value={startDate}
                    />
                    <DateInput 
                        label="To"
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setEndDate(value);
                        }}
                        value={endDate}
                    />
                    <Dropdown 
                        label="Sort"
                        options={Object.keys(options).map(opt => ({ label: opt, value: opt }))}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setSorting(options[value]);
                        }}
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