import TextField from "../ui/TextField";
import Dropdown from "../ui/Dropdown";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";
import { Search } from "lucide-react";
import type { PaginationState } from "@tanstack/react-table";

interface AuditLogsControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    order: "asc" | "desc";
    setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export default function ReturnRequestControls({
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
    order,
    setOrder,
    setPagination
}: AuditLogsControlsProps) {

    const clear = () => {
        setStartDate('');
        setEndDate('');
        setOrder('desc');
    }

    return (
        <div className="flex flex-col gap-4 px-5 mb-5">
            <div className="flex items-center w-full gap-2">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by distributor name, email or ID..."
                onChange={(e) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSearch(e.target.value);
                }}
            />

            <FiltersMenu containerStyle="w-[80vw] md:w-100">
                <h1 className="font-bold text-lg">Filter</h1>
                <div className="flex flex-col gap-3 grid md:grid-cols-2 md:gap-5 mt-4">
                    <DateInput 
                        label="From"
                        onChange={(value) => setStartDate(value)}
                        value={startDate}
                    />

                    <DateInput 
                        label="To"
                        onChange={(value) => setEndDate(value)}
                        value={endDate}
                    />

                    <Dropdown 
                        label="Sort"
                        value={order}
                        onChange={(value) => setOrder(value as "asc" | "desc")}
                        options={[
                            { label: 'NEWEST', value: 'desc' },
                            { label: 'OLDEST', value: 'asc' },
                        ]}
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
        </div>
    )
}