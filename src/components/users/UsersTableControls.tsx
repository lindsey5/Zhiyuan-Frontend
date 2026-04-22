import { Search } from "lucide-react";
import { RoleDropdown } from "../ui/Dropdown";
import FiltersMenu from "../ui/FiltersMenu";
import TextField from "../ui/TextField";
import type { PaginationState } from "@tanstack/react-table";

interface UsersTableControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export default function UsersTableControls({
    setSearch,
    role,
    setRole,
    setPagination
}: UsersTableControlsProps) {

    return (
            <div className="flex items-center justify-between w-full gap-2 px-4">
             {/* Search Field */}
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by name, email..."
                onChange={(e) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSearch(e.target.value)
                }}
            />

            {/* Role Dropdown */}
            <div className="hidden md:block w-48">
                <RoleDropdown 
                    onChange={(value) => {
                        setPagination(prev => ({...prev, pageIndex: 0}))
                        setRole(value);
                    }}
                    value={role}
                />
            </div>

            {/* Mobile Filters */}
            <FiltersMenu className="md:hidden" containerStyle="w-[60vw] space-y-3">
                <h1 className="font-bold text-md md:text-lg">Filter</h1>
                <RoleDropdown 
                    onChange={(value) => {
                        setPagination(prev => ({...prev, pageIndex: 0}))
                        setRole(value);
                    }}
                    value={role}
                />
            </FiltersMenu>
            </div>
    )
}