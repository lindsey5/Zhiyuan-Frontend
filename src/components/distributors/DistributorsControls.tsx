import { Plus } from "lucide-react";
import Button from "../ui/Button";
import { SearchField } from "../ui/TextField";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import type { Distributor } from "../../types/distributor.type";
import DistributorModal from "./DistributorModal";

interface DistributorsControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    distributor?: Distributor;
    setDistributor: React.Dispatch<React.SetStateAction<Distributor | undefined>>
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    permissions: string[]
}

export default function DistributorControls ({ 
    setSearch, 
    distributor,
    setDistributor,
    setShowModal, 
    showModal,
    permissions
} : DistributorsControlsProps) {
    const { hasPermissions } = usePermissions();

    const onClose = () =>{
        setDistributor(undefined);
        setShowModal(false)
    }

    return (
        <div className="flex items-center justify-between flex-wrap gap-5 px-5">
            <div className="w-full lg:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search distributor..."
                />
            </div>
            <DistributorModal 
                onClose={onClose}
                open={showModal}
                distributor={distributor}
            />
            {hasPermissions([PERMISSIONS.DISTRIBUTOR_CREATE], permissions) && (
                <Button 
                    icon={<Plus size={18}/>}
                    label="Add Distributor"
                    onClick={() => setShowModal(true)}
                />
            )}
        </div>
    )
}