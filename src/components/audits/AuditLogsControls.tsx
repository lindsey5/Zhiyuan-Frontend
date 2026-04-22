import TextField from "../ui/TextField";
import Dropdown, { RoleDropdown } from "../ui/Dropdown";
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
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
    severity: string;
    setSeverity: React.Dispatch<React.SetStateAction<string>>;
    order: "asc" | "desc";
    setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export default function AuditLogsControls({
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
    role,
    setRole,
    severity,
    setSeverity,
    order,
    setOrder,
    setPagination
}: AuditLogsControlsProps) {

    const clear = () => {
        setStartDate('');
        setEndDate('');
        setRole('');
        setSeverity('');
        setOrder('desc');
    }

    return (
        <div className="flex flex-col gap-4 px-5 mb-5">
            <div className="flex items-center w-full gap-2">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by user or action..."
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
                        label="Severity"
                        value={severity}
                        onChange={(value) => { 
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setSeverity(value)
                        }}
                        options={[
                            { label: 'All', value: '' },
                            { label: 'LOW', value: 'LOW' },
                            { label: 'MEDIUM', value: 'MEDIUM' },
                            { label: 'HIGH', value: 'HIGH' },
                            { label: 'CRITICAL', value: 'CRITICAL' }
                        ]}
                    />

                    <RoleDropdown 
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setRole(value);
                        }}
                        value={role}
                    />

                    <Dropdown 
                        label="Sort"
                        value={order}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setOrder(value as "asc" | "desc")
                        }}
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