import { PERMISSIONS } from "../../config/permission";
import usePermissions from "../../hooks/usePermissions";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";

const STATUS_FLOW: Record<string, string[]> = {
    pending: ["rejected", "cancelled",],
    approved: ["processing", "cancelled"],
    processing: ["delivered", "cancelled"],
    delivered: ["failed"],
    received: [],
    rejected: [],
    cancelled: [],
};

type Props = {
    currentStatus: string;
    onChangeStatus: (status: string) => void;
};

export default function StockTransferStatusButtons({
    currentStatus,
    onChangeStatus,
}: Props) {
    const { hasPermissions } = usePermissions();
    const actions = STATUS_FLOW[currentStatus] || [];

    if (actions.length === 0) return null;

    if(!hasPermissions([PERMISSIONS.STOCK_DISTRIBUTION_UPDATE])) return null

    return (
        <div className="flex justify-end flex-wrap gap-2 mt-5">
        {actions.map((status) => (
            <>
            {status === 'cancelled' || status === 'rejected' || status === 'failed' ? (
                <Button
                    key={status}
                    onClick={() => onChangeStatus(status)}
                    label={` Mark as ${status}`}
                />
            ) : (
                <GoldButton  
                    key={status}
                    onClick={() => onChangeStatus(status)}
                    className="text-sm"
                >
                    Mark as {status}
                </GoldButton>
            )}
            </>
        ))}
        </div>
    );
}