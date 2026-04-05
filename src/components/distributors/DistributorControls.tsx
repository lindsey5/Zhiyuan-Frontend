import Dropdown from "../ui/Dropdown";
import FiltersMenu from "../ui/FiltersMenu";
import { SearchField } from "../ui/TextField";

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

export default function DistributorControls ({ 
    setSearch, 
    sort,
    setSort,
    order,
    setOrder
} : DistributorsControlsProps) {

    return (
        <div className="flex items-center justify-between gap-5 px-5 mb-5">
            <div className="w-full md:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search distributor..."
                />
            </div>
            <FiltersMenu className="md:hidden" containerStyle="md:flex gap-3 w-[80vw] md:w-100">
                <Dropdown 
                    className="md:flex-1"
                    title="Sort by"
                    options={sortOptions.map(opt => opt)}
                    onChange={(value) => setSort(value)}
                    value={sort}
                />
                <Dropdown 
                    className="md:flex-1"
                    title="Order"
                    options={orderOptions.map(opt => opt)}
                    onChange={(value) => setOrder(value as 'asc' | 'desc')}
                    value={order}
                />
            </FiltersMenu>
            <div className="max-w-100 w-[40%] hidden md:flex items-center space-x-3 flex-wrap">
                <Dropdown 
                    className="flex-1"
                    title="Sort by"
                    options={sortOptions.map(opt => opt)}
                    onChange={(value) => setSort(value)}
                    value={sort}
                />
                <Dropdown 
                    className="flex-1"
                    title="Order"
                    options={orderOptions.map(opt => opt)}
                    onChange={(value) => setOrder(value as 'asc' | 'desc')}
                    value={order}
                />

            </div>
        </div>
    )
}