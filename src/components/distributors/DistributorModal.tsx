import Card from "../ui/Card"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextField from "../ui/TextField"
import Button from "../ui/Button"
import { X } from "lucide-react"
import { promiseToast } from "../../utils/sileo"
import { useEffect } from "react"
import GoldButton from "../ui/GoldButton"
import { useAuthStore } from "../../lib/store/authStore"
import type { Distributor } from "../../types/distributor.type"
import { useDistributor } from "../../hooks/useDistributor"
import { distributorSchema, type DistributorFormData } from "../../schemas/distributorSchema"

type DistributorModalProps = {
    open: boolean
    onClose: () => void
    distributor?: Distributor
}

export default function DistributorModal({ open, onClose, distributor }: DistributorModalProps) {
    const { accessToken } = useAuthStore();
    const { createDistributor, updateDistributor } = useDistributor();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<DistributorFormData>({
        resolver: zodResolver(distributorSchema),
    });

    const close = () => {
        onClose();
        reset({ 
            distributor_name: undefined,
            email: undefined,
            commission_rate: undefined
        });
    }

    const onSubmit : SubmitHandler<DistributorFormData> = async (data) => {

        const callBack = distributor 
        ? 
        updateDistributor.mutateAsync({
            id: distributor.id,
            data,
            accessToken: accessToken || ""
        }) : 
        createDistributor.mutateAsync({
            accessToken: accessToken || "",
            data
        })

        promiseToast(callBack) 
    }

    useEffect(() => {
        if(distributor) reset({ 
            distributor_name: distributor.distributor_name,
            commission_rate: distributor.commission_rate,
            email: distributor.email
        })
    }, [distributor])
    

    if (!open) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-5">
            <Card className="w-full max-w-md">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold font-sans">{distributor ? 'Edit' : 'Add'} Distributor</h2>
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
                    <TextField
                        label="Commission Rate"
                        type="number"
                        placeholder="Enter Commission Rate"
                        registration={register("commission_rate",  {
                            setValueAs: value => Number(value)
                        })}
                        error={errors.commission_rate?.message}
                        disabled={createDistributor.isPending}
                    />

                    <div className="flex justify-end gap-3 pt-3">
                        <GoldButton
                            type="submit"
                            className="text-sm"
                            disabled={createDistributor.isPending}
                        >{distributor ? 'Save changes' : 'Create'}</GoldButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}