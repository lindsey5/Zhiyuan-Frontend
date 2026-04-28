import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import TextField from "../ui/TextField";
import type { DistributorFormData } from "../../schemas/distributorSchema";
import { useDistributor } from "../../hooks/useDistributor";
import type { Distributor } from "../../types/distributor.type";
import { useDebounce } from "../../hooks/useDebounce";

interface ParentDistributorAutoCompleteProps {
    disabled: boolean;
    error: string;
    setValue: UseFormSetValue<DistributorFormData>;
}

export default function ParentDistributorAutoComplete({
    error,
    disabled,
    setValue
}: ParentDistributorAutoCompleteProps) {
    const [page] = useState(1);
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const debouncedSearch = useDebounce(query, 800);

    const { getDistributors } = useDistributor();

    const { data } = getDistributors({
        page,
        search: debouncedSearch,
        limit: 10,
        sortBy: "distributor_name",
        order: "asc"
    });

    const distributors: Distributor[] = data?.distributors || [];

    const handleSelect = (distributor: Distributor) => {
        setQuery(distributor.distributor_name);
        setValue("parent_distributor_id", distributor.distributor_id);
        setShowDropdown(false);
    };

    return (
        <div className="relative">
            <TextField
                label="Parent Distributor (Optional)"
                placeholder="Search distributor..."
                value={query}
                error={error}
                disabled={disabled}
                onChange={(e: any) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setShowDropdown(false);
                    }, 150);
                }}
            />

            {showDropdown && distributors.length > 0 && (
            <ul className="absolute z-10 w-full bg-panel border border-[var(--border-panel)] rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
                {distributors.map((dist) => (
                    <li
                        key={dist.distributor_id}
                        onClick={() => handleSelect(dist)}
                        className="border-b border-[var(--border-panel)] px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-[var(--bg-panel-hover)]"
                    >
                        {/* Name */}
                        <div className="font-bold text-sm">
                            {dist.distributor_name}
                        </div>
                        {/* Email */}
                        <div className="text-sm mt-1 truncate">
                            {dist.email}
                        </div>

                        {/* Distributor ID */}
                        <div className="text-xs mt-1">
                            {dist.distributor_id}
                        </div>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
}