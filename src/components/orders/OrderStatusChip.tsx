import type { Order } from "../../types/order.type";
import Chip from "../ui/Chip";

export default function OrderStatusChip({ status }: { status: Order["status"] }) {
    switch (status) {
        case "pending":
        return (
            <Chip className="capitalize flex items-center gap-2 bg-yellow-100 text-yellow-700">
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                Pending
            </Chip>
        );

        case "processing":
        return (
            <Chip className="capitalize flex items-center gap-2 bg-blue-100 text-blue-700">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                Processing
            </Chip>
        );

        case "completed":
        return (
            <Chip className="capitalize flex items-center gap-2 bg-green-100 text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Completed
            </Chip>
        );

        case "cancelled":
        return (
            <Chip className="capitalize flex items-center gap-2 bg-red-100 text-red-700">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Cancelled
            </Chip>
        );

        case "refunded":
        return (
            <Chip className="capitalize flex items-center gap-2 bg-gray-200 text-gray-700">
                <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                Refunded
            </Chip>
        );

        default:
        return <Chip>{status}</Chip>;
    }
}