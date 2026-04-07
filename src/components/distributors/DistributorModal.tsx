import Card from "../ui/Card"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextField from "../ui/TextField"
import Button from "../ui/Button"
import { X } from "lucide-react"
import { promiseToast } from "../../utils/sileo"
import { distributorSchema, type DistributorFormData } from "../../schemas/distributorSchema"
import { useDistributor } from "../../hooks/useDistributor"
import GoldButton from "../ui/GoldButton"
import Modal from "../ui/Modal"

type DistributorModalProps = {
    open: boolean
    onClose: () => void
}

export default function DistributorModal({ open, onClose }: DistributorModalProps) {
    const { createDistributor } = useDistributor();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<DistributorFormData>({
        resolver: zodResolver(distributorSchema),
    });

    const close = () => {
        onClose();
        reset({ 
            distributor_name: undefined,
            email: undefined,
        });
    }

    const onSubmit : SubmitHandler<DistributorFormData> = async (data) => {
        promiseToast(createDistributor.mutateAsync({ data})) 
    }

    return (
        <Modal
            onClose={close}
            open={open}
        >
            <Card className="w-full max-w-md">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold font-sans">Add Distributor</h2>
                    <Button 
                        className="border-none p-0"
                        icon={<X size={20}/>}
                        onClick={close}
                        disabled={createDistributor.isPending}
                    />
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Name"
                        placeholder="Enter Distributor Name"
                        registration={register("distributor_name")}
                        error={errors.distributor_name?.message}
                        disabled={createDistributor.isPending}
                    />
                    <TextField
                        label="Email"
                        placeholder="Enter distributor Email"
                        registration={register("email")}
                        error={errors.email?.message}
                        disabled={createDistributor.isPending}
                    />

                    <div className="flex justify-end gap-3 pt-3">
                        <GoldButton
                            type="submit"
                            className="text-sm"
                            disabled={createDistributor.isPending}
                        >Create</GoldButton>
                    </div>
                </form>
            </Card>
        </Modal>
    )
}