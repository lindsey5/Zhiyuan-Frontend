import { Plus } from "lucide-react";
import Button from "../ui/Button";
import { SearchField } from "../ui/TextField";
import CategoryModal from "./CategoryModal";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import type { Category } from "../../types/category";

interface CategoriesControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    category?: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    permissions: string[]
}

export default function CategoriesControls ({ 
    setSearch, 
    category, 
    setCategory,
    setShowModal, 
    showModal,
    permissions
} : CategoriesControlsProps) {
    const { hasPermissions } = usePermissions();
    const onClose = () =>{
        setCategory(undefined);
        setShowModal(false)
    }

    return (
        <div className="flex items-center justify-between flex-wrap gap-5 px-5">
            <CategoryModal 
                onClose={onClose}
                open={showModal}
                category={category}
            />
            <div className="w-full lg:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search category..."
                />
            </div>
            {hasPermissions([PERMISSIONS.CATEGORY_CREATE], permissions) && (
                <Button 
                    icon={<Plus size={18}/>}
                    label="Add Category"
                    onClick={() => setShowModal(true)}
                />
            )}
        </div>
    )
}