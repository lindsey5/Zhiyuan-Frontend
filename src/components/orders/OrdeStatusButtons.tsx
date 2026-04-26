import { PERMISSIONS } from "../../config/permission";
import usePermissions from "../../hooks/usePermissions";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";

const STATUS_FLOW: Record<string, string[]> = {
    pending: ["cancelled", "processing"],
    processing: ["cancelled", "delivered"],
    delivered: ["refunded", "failed", "completed"],
    completed: ["refunded"],
    cancelled: [],
    refunded: [],
    expired: [],
    failed: [],
};

type Props = {
    currentStatus: string;
    onChangeStatus: (status: string) => void;
};

export default function OrderStatusButtons({
  currentStatus,
  onChangeStatus,
}: Props) {
    const { hasPermissions } = usePermissions();
    const actions = STATUS_FLOW[currentStatus] || [];

    if (actions.length === 0) return null;

    if (!hasPermissions([PERMISSIONS.ORDER_UPDATE])) return null;

    return (
        <div className="flex justify-end flex-wrap gap-2">
        {actions.map((status) => {
            const isDanger = ["cancelled", "failed", "expired", "refunded"].includes(
                status
            );

            return isDanger ? (
                <Button
                    key={status}
                    className="bg-red-600 text-white border-none"
                    onClick={() => onChangeStatus(status)}
                    label={`Mark as ${status}`}
                />
            ) : (
                <GoldButton
                    key={status}
                    onClick={() => onChangeStatus(status)}
                    className="text-sm"
                >
                    Mark as {status}
                </GoldButton>
            );
        })}
        </div>
    );
}