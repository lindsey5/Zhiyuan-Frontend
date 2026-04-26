import { Search } from "lucide-react";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";
import TextField from "../ui/TextField";
import type { PaginationState } from "@tanstack/react-table";
import Dropdown from "../ui/Dropdown";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";

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
    getOwn: boolean;
    setGetOwn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StockTransferLogsControls({
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
    setPagination,
    status,
    setStatus,
    getOwn,
    setGetOwn
}: StockTransferLogsControlsProps) {
    const { hasPermissions } = usePermissions();
    const clear = () => {
        setStartDate('');
        setEndDate('');
        setStatus('');
    }

    return (
        <div className="flex justify-between gap-4 px-5">
            <div className="flex items-center w-full gap-2">
                <TextField 
                    className="md:max-w-100"
                    icon={<Search size={20}/>}
                    placeholder={getOwn ? "Search by transfer no, or receiver..." : "Search by transfer no, receiver or sender..."}
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
                            onChange={(value) => {
                                setPagination(prev => ({...prev, pageIndex: 0}))
                                setStatus(value)
                            }}
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
            {hasPermissions([PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_ALL]) && (
                <button 
                    className="w-57 border border-[var(--toggle-border)] flex justify-between items-center gap-3 px-3 py-2 rounded-full bg-toggle shadow-xl transition-all"
                    onClick={() => setGetOwn(prev => !prev)}
                >
                    <p className="text-gold text-sm">My Distribution</p>
                    <div className="relative w-12 h-6 rounded-full bg-toggle-inner p-1">
                        <div className={`w-4 h-4 rounded-full bg-toggle-thumb transition-transform duration-300 ${getOwn ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </button>
            )}
        </div>
    )
}