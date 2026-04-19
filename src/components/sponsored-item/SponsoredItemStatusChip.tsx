import Chip from "../ui/Chip";

const SponsoredItemStatusChip = ({ status } : { status: string }) => {
    switch (status) {
        case "pending":
        return (
            <Chip className="flex items-center gap-2 capitalize">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Pending
            </Chip>
        );

        case "rejected":
        return (
            <Chip className="flex items-center gap-2 capitalize">
                 <span className="w-2 h-2 rounded-full bg-red-600"></span>
                Rejected
            </Chip>
        );

        default:
        return (
            <Chip className="flex items-center gap-2 capitalize">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {status}
            </Chip>
        );
    }
};

export default SponsoredItemStatusChip