import { Plus } from "lucide-react";
import Button from "../ui/Button";
import { SearchField } from "../ui/TextField";
import { useState } from "react";
import CategoryModal from "./CategoryModal";

interface CategoriesControlsProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoriesControls ({ setSearch } : CategoriesControlsProps) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <div className="p-5 flex items-center justify-between flex-wrap gap-5">
            <CategoryModal 
                onClose={() => setShowModal(false)}
                open={showModal}
            />
            <div className="w-full lg:max-w-100">
                <SearchField 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search category..."
                />
            </div>
            <Button 
                icon={<Plus size={18}/>}
                label="Add Category"
                onClick={() => setShowModal(true)}
            />
        </div>
    )
}