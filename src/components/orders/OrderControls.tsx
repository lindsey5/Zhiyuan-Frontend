import TextField from "../ui/TextField";
import Dropdown from "../ui/Dropdown";
import DateInput from "../ui/DateInput";
import FiltersMenu from "../ui/FiltersMenu";
import { Search } from "lucide-react";
import type { PaginationState } from "@tanstack/react-table";
import type { SetStateAction } from "react";
import type React from "react";

interface OrderControlsProps {
    search: string;
    setSearch: React.Dispatch<SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<SetStateAction<string>>;
    paymentStatus: string;
    setPaymentStatus: React.Dispatch<SetStateAction<string>>;
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<SetStateAction<string>>;
    deliveryType: string;
    setDeliveryType: React.Dispatch<SetStateAction<string>>;
    setPagination: React.Dispatch<SetStateAction<PaginationState>>;
}

const statusOptions = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Refunded", value: "refunded" },
]

const paymentStatusOptions = [
    { label: "All", value: "" },
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
]

const paymentMethodOptions = [
    { label: "All", value: "" },
    { label: "COD", value: "COD" },
    { label: "GCash", value: "GCash" },
    { label: "Paymaya", value: "Paymaya" },
    { label: "Card", value: "Card" }
]

const deliveryTypeOptions = [
    { label: "All", value: "" },
    { label: "For Pickup", value: "pickup" },
    { label: "For Delivery", value: "delivery" },
]

export default function OrderControls({
    startDate,
    endDate,
    search,
    setSearch,
    setStartDate,
    setEndDate,
    status,
    setStatus,
    paymentStatus,
    setPaymentStatus,
    paymentMethod,
    setPaymentMethod,
    setPagination,
    deliveryType,
    setDeliveryType
}: OrderControlsProps) {

    const clear = () => {
        setStartDate('');
        setEndDate('');
    }

    return (
        <div className="flex flex-col gap-4 px-5 mb-5">
            <div className="flex items-center w-full gap-2">
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search by customer or order id..."
                onChange={(e) => {
                    setPagination(prev => ({...prev, pageIndex: 0}))
                    setSearch(e.target.value);
                }}
                value={search}
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
                        label="Payment Method"
                        value={paymentMethod}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setPaymentMethod(value)
                        }}
                        options={paymentMethodOptions}
                    />

                    <Dropdown
                        label="Payment Status"
                        value={paymentStatus}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setPaymentStatus(value)
                        }}
                        options={paymentStatusOptions}
                    />

                    <Dropdown
                        label="Status"
                        value={status}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setStatus(value)
                        }}
                        options={statusOptions}
                    />

                    <Dropdown
                        label="Delivery Type"
                        value={deliveryType}
                        onChange={(value) => {
                            setPagination(prev => ({...prev, pageIndex: 0}))
                            setDeliveryType(value)
                        }}
                        options={deliveryTypeOptions}
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