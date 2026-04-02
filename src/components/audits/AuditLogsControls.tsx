import { useState } from "react";
import { SearchField } from "../ui/TextField";
import Dropdown, { RoleDropdown } from "../ui/Dropdown";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";

interface AuditLogsControlsProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  severity: string;
  setSeverity: React.Dispatch<React.SetStateAction<string>>;
  order: "ASC" | "DESC";
  setOrder: React.Dispatch<React.SetStateAction<"ASC" | "DESC">>;
}

export default function AuditLogsControls({
  setSearch,
  setStartDate,
  setEndDate,
  role,
  setRole,
  severity,
  setSeverity,
  order,
  setOrder,
}: AuditLogsControlsProps) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="flex flex-col gap-4 px-5">
            <div className="flex items-center justify-between w-full gap-2">
                <div className="flex-1">
                    <SearchField
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by user or action..."
                    />
                </div>

            <FiltersMenu containerStyle="w-[80vw] md:w-100" show={showFilters} setShow={setShowFilters}>
                <h1 className="font-bold text-lg">Filter</h1>
                <div className="grid grid-cols-2 gap-5 mt-4">
                    <DateInput 
                        label="Start Date"
                        onChange={(value) => setStartDate(value)}
                    />

                    <DateInput 
                        label="End Date"
                        onChange={(value) => setEndDate(value)}
                    />

                    <Dropdown 
                        title="Severity"
                        value={severity}
                        onChange={(value) => setSeverity(value)}
                        options={[
                            { label: 'All', value: '' },
                            { label: 'LOW', value: 'LOW' },
                            { label: 'MEDIUM', value: 'MEDIUM' },
                            { label: 'HIGH', value: 'HIGH' },
                            { label: 'CRITICAL', value: 'CRITICAL' }
                        ]}
                    />

                    <RoleDropdown 
                        onChange={setRole}
                        value={role}
                    />

                    <Dropdown 
                        title="Sort"
                        value={order}
                        onChange={(value) => setOrder(value as "ASC" | "DESC")}
                        options={[
                            { label: 'NEWEST', value: 'DESC' },
                            { label: 'OLDEST', value: 'ASC' },
                        ]}
                    />
                </div>
            </FiltersMenu>
            </div>
        </div>
    )
}