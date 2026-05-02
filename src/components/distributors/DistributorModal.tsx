import Card from "../ui/Card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextField from "../ui/TextField"
import Button from "../ui/Button"
import { X } from "lucide-react"
import { promiseToast } from "../../utils/sileo"
import { createDistributorSchema, updateDistributorSchema } from "../../schemas/distributorSchema"
import { useDistributor } from "../../hooks/useDistributor"
import GoldButton from "../ui/GoldButton"
import Modal from "../ui/Modal"
import ParentDistributorAutoComplete from "./ParentDistributorAutoComplete"
import type { Distributor } from "../../types/distributor.type"
import { useEffect } from "react"

type DistributorModalProps = {
    open: boolean
    onClose: () => void
    distributor: Distributor | null
}

type DistributorForm = {
    distributor_name?: string;
    email?: string;
    commission_rate: number;
    child_commission_rate: number;
    parent_distributor_id?: string;
};

export default function DistributorModal({ open, onClose, distributor }: DistributorModalProps) {
    const { createDistributor, updateDistributor } = useDistributor();

    const form = useForm<DistributorForm>({
        resolver: zodResolver(distributor ? updateDistributorSchema : createDistributorSchema),
        defaultValues: {
            distributor_name: "",
            email: "",
            child_commission_rate: 2,
            commission_rate: 5,
            parent_distributor_id: undefined,
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = form;

    const close = () => {
        onClose();
        reset({
            distributor_name: "",
            email: "",
            child_commission_rate: 2,
            commission_rate: 5,
            parent_distributor_id: undefined,
        });
    };

    const onSubmit = async (data: any) => {
        promiseToast(
            distributor
                ? updateDistributor.mutateAsync({ data, id: distributor._id })
                : createDistributor.mutateAsync({ data })
        );
    };

    useEffect(() => {
        if (distributor) {
            reset({
                distributor_name: distributor.distributor_name,
                email: distributor.email,
                commission_rate: distributor.commission_rate,
                child_commission_rate: distributor.child_commission_rate,
                parent_distributor_id: distributor.parent_distributor_id,
            });
        }
    }, [distributor, reset]);

    return (
        <Modal onClose={close} open={open}>
            <Card className="w-full max-w-md">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold font-sans">
                        {distributor ? "Update" : "Create"} Distributor
                    </h2>

                    <Button
                        className="border-none p-0"
                        icon={<X size={20} />}
                        onClick={close}
                        disabled={createDistributor.isPending || updateDistributor.isPending}
                    />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Name"
                        placeholder="Enter Distributor Name"
                        registration={register("distributor_name")}
                        error={errors.distributor_name?.message}
                        disabled={!!distributor}
                    />

                    <TextField
                        label="Email"
                        placeholder="Enter Distributor Email"
                        registration={register("email")}
                        error={errors.email?.message}
                        disabled={!!distributor}
                    />

                    <ParentDistributorAutoComplete
                        disabled={createDistributor.isPending || updateDistributor.isPending}
                        error={errors.parent_distributor_id?.message || ""}
                        setValue={setValue}
                        distributor={distributor}
                    />

                    <TextField
                        error={errors.commission_rate?.message}
                        label="Commission Rate (%)"
                        type="number"
                        registration={register("commission_rate", {
                            setValueAs: (value) => Number(value),
                        })}
                    />

                    <TextField
                        error={errors.child_commission_rate?.message}
                        label="Commission from Downline Distributor(%)"
                        type="number"
                        registration={register("child_commission_rate", {
                            setValueAs: (value) => Number(value),
                        })}
                    />

                    <div className="flex justify-end gap-3 pt-3">
                        <GoldButton
                            type="submit"
                            className="text-sm"
                            disabled={createDistributor.isPending || updateDistributor.isPending}
                        >
                            {distributor ? "Update" : "Create"}
                        </GoldButton>
                    </div>
                </form>
            </Card>
        </Modal>
    );
}