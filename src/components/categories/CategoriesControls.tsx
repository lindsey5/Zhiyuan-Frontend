import { Plus, Search } from "lucide-react";
import Button from "../ui/Button";
import CategoryModal from "./CategoryModal";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import type { Category } from "../../types/category.type";
import TextField from "../ui/TextField";

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
        <div className="flex items-center justify-between gap-5 px-5">
            <CategoryModal 
                onClose={onClose}
                open={showModal}
                category={category}
            />
            <TextField 
                className="md:max-w-100"
                icon={<Search size={20}/>}
                placeholder="Search category..."
                onChange={(e) => setSearch(e.target.value)}
            />
            {hasPermissions([PERMISSIONS.CATEGORY_CREATE], permissions) && (
                <Button 
                    className="text-xs lg:text-sm"
                    icon={<Plus size={18}/>}
                    label="Add Category"
                    onClick={() => setShowModal(true)}
                />
            )}
        </div>
    )
}