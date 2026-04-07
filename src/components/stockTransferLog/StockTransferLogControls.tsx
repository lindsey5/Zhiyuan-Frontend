import { SearchField } from "../ui/TextField";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";

interface StockTransferLogsControlsProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

export default function StockTransferLogsControls({
  setSearch,
  setStartDate,
  setEndDate,
}: StockTransferLogsControlsProps) {

    return (
        <div className="flex flex-col gap-4 px-5">
            <div className="flex items-center justify-between w-full gap-2">
                <div className="w-full md:max-w-100">
                    <SearchField
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by receiver or sender..."
                    />
                </div>
                <div className="hidden md:flex items-center space-x-3 flex-wrap">
                        <DateInput 
                            label="From"
                            onChange={(value) => setStartDate(value)}
                        />

                        <DateInput 
                            label="To"
                            onChange={(value) => setEndDate(value)}
                        />
                </div>

                <FiltersMenu className="md:hidden" containerStyle="w-[80vw] md:w-100">
                    <h1 className="font-bold text-lg">Filter</h1>
                    <div className="grid grid-cols-2 gap-5 mt-4">
                        <DateInput 
                            label="From"
                            onChange={(value) => setStartDate(value)}
                        />

                        <DateInput 
                            label="To"
                            onChange={(value) => setEndDate(value)}
                        />
                    </div>
                </FiltersMenu>
            </div>
        </div>
    )
}