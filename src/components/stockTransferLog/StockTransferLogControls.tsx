import { Search } from "lucide-react";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";
import TextField from "../ui/TextField";

interface StockTransferLogsControlsProps {
    startDate: string;
    endDate: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    }

export default function StockTransferLogsControls({
    startDate,
    endDate,
    setSearch,
    setStartDate,
    setEndDate,
}: StockTransferLogsControlsProps) {

    const clear = () => {
        setStartDate('');
        setEndDate('');
    }

    return (
        <div className="flex flex-col gap-4 px-5">
            <div className="flex items-center justify-between w-full gap-2">
                <TextField 
                    className="md:max-w-100"
                    icon={<Search size={20}/>}
                    placeholder="Search by receiver or sender..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="hidden md:flex items-center space-x-3 flex-wrap">
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
                        <button 
                            className="mt-5 cursor-pointer hover:text-gold text-sm md:text-sm"
                            onClick={clear}
                        >Clear</button>
                </div>

                <FiltersMenu className="md:hidden" containerStyle="w-[80vw] md:w-100">
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

                        <div className="flex justify-end">
                            <button 
                                className="cursor-pointer hover:text-gold text-sm md:text-sm"
                                onClick={clear}
                            >Clear</button>
                        </div>
                    </div>
                </FiltersMenu>
            </div>
        </div>
    )
}