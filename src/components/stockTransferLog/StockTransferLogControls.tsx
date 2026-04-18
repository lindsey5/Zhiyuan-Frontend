import { Search } from "lucide-react";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";
import TextField from "../ui/TextField";
import type { PaginationState } from "@tanstack/react-table";
import Dropdown from "../ui/Dropdown";

const stockTransferStatus = [
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

interface StockTransferLogsControlsProps {
    startDate: string;
    endDate: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    status: string;
    setStatus:  React.Dispatch<React.SetStateAction<string>>;
}

export default function StockTransferLogsControls({
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
    setPagination,
    status,
    setStatus
}: StockTransferLogsControlsProps) {

    const clear = () => {
        setStartDate('');
        setEndDate('');
        setStatus('');
    }

    return (
        <div className="flex flex-col gap-4 px-5">
            <div className="flex items-center w-full gap-2">
                <TextField 
                    className="md:max-w-100"
                    icon={<Search size={20}/>}
                    placeholder="Search by receiver or sender..."
                    onChange={(e) => {
                        setPagination(prev => ({ ...prev, pageIndex: 0 }))
                        setSearch(e.target.value);
                    }}
                />
                <FiltersMenu containerStyle="w-[80vw] md:w-100">
                    <h1 className="font-bold text-md md:text-lg">Filter</h1>
                    <div className="grid md:grid-cols-2 gap-5 mt-4">
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
                            onChange={setStatus}
                            label="Status"
                            options={stockTransferStatus.map(s => ({
                                label: s.label,
                                value: s.value
                            }))}
                            value={status}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
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