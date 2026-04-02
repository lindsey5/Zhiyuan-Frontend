import { useState } from "react";
import { SearchField } from "../ui/TextField";
import { RoleDropdown } from "../ui/Dropdown";
import FiltersMenu from "../ui/FiltersMenu";

interface UsersTableControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}

export default function UsersTableControls({
    setSearch,
    role,
    setRole,
}: UsersTableControlsProps) {
    const [showFilters, setShowFilters] = useState(false);

    return (
            <div className="flex items-center justify-between w-full gap-2 px-4">
             {/* Search Field */}
            <div className="flex-1 md:max-w-100">
                <SearchField
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email..."
                />
            </div>

            {/* Role Dropdown */}
            <div className="hidden md:block w-48">
                <RoleDropdown 
                    onChange={setRole}
                    value={role}
                />
            </div>

            {/* Mobile Filters */}
            <FiltersMenu className="md:hidden" show={showFilters} setShow={setShowFilters}>
                <RoleDropdown 
                    onChange={setRole}
                    value={role}
                />
            </FiltersMenu>
            </div>
    )
}