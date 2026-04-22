import TextField from "../ui/TextField";
import Dropdown from "../ui/Dropdown";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";
import { Search } from "lucide-react";
import type { PaginationState } from "@tanstack/react-table";
import type { SetStateAction } from "react";
import type React from "react";

interface StockOrderControlsProps {
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<SetStateAction<string>>;
    setPagination: React.Dispatch<SetStateAction<PaginationState>>;
}

const statusOptions = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Processing", value: "processing" },
  { label: "Delivered", value: "delivered" },
  { label: "Received", value: "received" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Rejected", value: "rejected" },
  { label: "Failed", value: "failed" },
];

export default function StockOrderControls({
    startDate,
    endDate,
    search,
    setSearch,
    setStartDate,
    setEndDate,
    status,
    setStatus,
    setPagination,
}: StockOrderControlsProps) {

    const clear = () => {
        setStartDate('');
        setEndDate('');
    }

    return (
        <div className="flex flex-col gap-4 px-5 mb-5">
            <div className="flex items-center w-full gap-2">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by stock order id or distributor..."
                onChange={(e) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSearch(e.target.value);
                }}
                value={search}
            />

            <FiltersMenu containerStyle="w-[80vw] md:w-100">
                <h1 className="font-bold text-lg">Filter</h1>
                <div className="flex flex-col gap-3 grid md:grid-cols-2 md:gap-5 mt-4">
                    <DateInput 
                        label="From"
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setStartDate(value)
                        }}
                        value={startDate}
                    />

                    <DateInput 
                        label="To"
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setEndDate(value)
                        }}
                        value={endDate}
                    />

                    <Dropdown
                        label="Status"
                        value={status}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setStatus(value)
                        }}
                        options={statusOptions}
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