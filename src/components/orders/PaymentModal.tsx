import Modal from "../ui/Modal";
import Card from "../ui/Card";
import type { Order } from "../../types/order.type";
import Dropdown from "../ui/Dropdown";
import TextField from "../ui/TextField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { paymentSchema, type PaymentFormData } from "../../schemas/paymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import GoldButton from "../ui/GoldButton";
import { formatToPeso } from "../../utils/utils";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { useOrder } from "../../hooks/useOrder";
import { promiseToast } from "../../utils/sileo";

const paymentMethods = [
    { label: "Cash", value: "cash" },
    { label: "GCash", value: "gcash" },
    { label: "Paymaya", value: "paymaya" },
    { label: "Card", value: "card" },
];

interface PaymentModalProps {
    open: boolean;
    close: () => void;
    back: () => void;
    order: Order | null;
    setOrder: Dispatch<SetStateAction<Order | null>>;
}

export default function PaymentModal({ open, close, back, order, setOrder }: PaymentModalProps) {
    const { orderMarkAsPaid } = useOrder();

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            payment: 0,
            payment_method: "",
        },
    });

    const payment = watch("payment");
    const method = watch("payment_method");

    const change = useMemo(() => {
        if (!payment) return 0;
        return payment - (order?.total_amount || 0);
    }, [payment, order?.total_amount]);

    const onSubmit: SubmitHandler<PaymentFormData> = async (data) => {
        const isConfirmed = confirm('Confirm payment?');

        if(!isConfirmed) return;

        const response = await promiseToast(orderMarkAsPaid.mutateAsync({
            data: {
                ...data,
                payment_method: data.payment_method as Order['payment_method']
            },
            id: order?._id || ""
        }), "top-center", () => {});

        if(response.order){
            setOrder(response.order);
            back();
        }
    };

    return (
        <Modal open={open} onClose={close}>
            <Card>
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Header */}
                    <div>
                        <h1 className="font-bold text-base md:text-lg">Payment</h1>
                        <p className="text-xs text-muted mt-1">
                            Select payment method and enter customer payment.
                        </p>
                    </div>

                    {/* Payment Inputs */}
                    <div className="grid gap-3">
                        <Dropdown
                            options={paymentMethods}
                            label="Payment Method"
                            value={method}
                            onChange={(value) => setValue("payment_method", value)}
                            error={errors.payment_method?.message}
                        />

                        <TextField
                            label="Customer Payment"
                            placeholder="Enter customer payment"
                            onChange={(e) => {
                                setValue("payment", Number(e.target.value));
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "." || e.key === "," || e.key === "e" || e.key === "-") {
                                e.preventDefault();
                                }
                            }}
                            error={errors.payment?.message}
                        />
                    </div>

                    {/* Summary Box */}
                    <div className="rounded-md border border-[var(--border-ui)] bg-input-ui p-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <p className="text-muted">Total Amount</p>
                            <p className="font-semibold">{formatToPeso(order?.total_amount || 0)}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <p className="text-muted">Payment</p>
                            <p className="font-semibold">
                                {formatToPeso(payment ? payment : 0)}
                            </p>
                        </div>

                        <div className="h-[1px] bg-[var(--border-ui)] opacity-60" />

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">Change</p>
                            <p
                                className={`text-base font-bold ${
                                change >= 0 ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {formatToPeso(change < 0 ? 0 : change)}
                            </p>
                        </div>

                        {change < 0 && (
                        <p className="text-xs text-red-500">
                            Insufficient payment. Customer must pay at least{" "}
                            {formatToPeso(order?.total_amount || 0)}.
                        </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" label="Back" onClick={back} />

                        <GoldButton type="submit" className="text-sm px-6">
                            Confirm Payment
                        </GoldButton>
                    </div>
                </form>
            </Card>
        </Modal>
    );
}