import { Search } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import FiltersMenu from "../ui/FiltersMenu";
import TextField from "../ui/TextField";

const sortOptions = [
    { label: 'Distributor Name', value: 'distributor_name' },
    { label: 'Wallet Balance', value: 'wallet_balance' },
    { label: 'Date Created', value: 'createdAt' },
    { label: 'Total Stocks', value: 'total_stocks'}
]

const orderOptions = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' }
]

interface DistributorsControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    order: 'asc' | 'desc';
    setOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}

export default function DistributorsControls ({ 
    setSearch, 
    sort,
    setSort,
    order,
    setOrder
} : DistributorsControlsProps) {

    return (
        <div className="flex items-center justify-between gap-5 px-5 mb-5">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search distributor by id, name or email"
                onChange={(e) => setSearch(e.target.value)}
            />
            <FiltersMenu className="md:hidden" containerStyle="space-y-3 md:flex gap-3 w-[70vw] md:w-100">
                <h1 className="font-bold text-md md:text-lg">Filter</h1>
                <Dropdown 
                    className="md:flex-1"
                    label="Sort by"
                    options={sortOptions.map(opt => opt)}
                    onChange={(value) => setSort(value)}
                    value={sort}
                />
                <Dropdown 
                    className="md:flex-1"
                    label="Order"
                    options={orderOptions.map(opt => opt)}
                    onChange={(value) => setOrder(value as 'asc' | 'desc')}
                    value={order}
                />
            </FiltersMenu>
            <div className="max-w-100 w-[40%] hidden md:flex items-center space-x-3 flex-wrap">
                <Dropdown 
                    className="flex-1"
                    label="Sort by"
                    options={sortOptions.map(opt => opt)}
                    onChange={(value) => setSort(value)}
                    value={sort}
                />
                <Dropdown 
                    className="flex-1"
                    label="Order"
                    options={orderOptions.map(opt => opt)}
                    onChange={(value) => setOrder(value as 'asc' | 'desc')}
                    value={order}
                />

            </div>
        </div>
    )
}