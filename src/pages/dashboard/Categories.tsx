import { type ColumnDef, type Row } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable from "../../components/ui/Table";
import { useCategory } from "../../hooks/useCategory";
import type { Category } from "../../types/category.type";
import { formatDate } from "../../utils/utils";
import { useState, type SetStateAction } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import CategoriesControls from "../../components/categories/CategoriesControls";
import Button from "../../components/ui/Button";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import { promiseToast } from "../../utils/sileo";
import type { CreateColumnsParams } from "../../types/type";

interface CategoryColsParams extends CreateColumnsParams {
    setShowModal: React.Dispatch<SetStateAction<boolean>>,
    deleteExistingCategory: (id: string) => void,
    setCategory: React.Dispatch<SetStateAction<Category | undefined>>
}

const getColumns = ({ 
    hasAnyPermissions, 
    hasPermissions, 
    permissions, 
    deleteExistingCategory, 
    setCategory, 
    setShowModal
} : CategoryColsParams) : ColumnDef<Category>[] => [
    {
        header: "Category",
        accessorKey: "name",
        cell: ({ row }) => row.original.name,
    },
    {
        header: "Created At",
        cell: ({ row }) => formatDate(row.original.createdAt),
        meta: { align: 'center' },
    },
    ...(hasAnyPermissions([ PERMISSIONS.CATEGORY_DELETE, PERMISSIONS.CATEGORY_UPDATE], permissions)
        ? [
            {
                header: "Action",
                cell: ({ row }: { row: Row<Category> }) => (
                    <div className="flex gap-3 md:justify-center">
                        {hasPermissions([PERMISSIONS.CATEGORY_UPDATE], permissions) && (
                            <Button
                                label="Edit"
                                className="p-2 md:p-3 text-xs xl:text-sm"
                                onClick={() => {
                                    setCategory(row.original);
                                    setShowModal(true);
                                }}
                            />
                        )}

                        {hasPermissions([PERMISSIONS.CATEGORY_DELETE], permissions) && (
                            <Button
                                label="Delete"
                                className="bg-red-600 text-white p-2 md:p-3 text-xs xl:text-sm"
                                onClick={() => deleteExistingCategory(row.original._id)}
                            />
                        )}
                    </div>
                ),
                meta: { align: 'center' },
            },
        ]
    : []),
];

export default function Categories () {

    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole();
    const permissions =  role?.permissions || [];
    const { hasPermissions, hasAnyPermissions } = usePermissions();

    const [category, setCategory] = useState<Category>();
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);

    const { getCategories, deleteCategory } = useCategory();
    const { data, isFetching } = getCategories({ search: debouncedSearch });

    const deleteExistingCategory = (id: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");
        if (!isConfirmed) return;

        promiseToast(deleteCategory.mutateAsync({ id }), "top-center", "Category succesfully deleted.")
    };

    const columns = getColumns({
        hasPermissions,
        hasAnyPermissions,
        permissions,
        setShowModal,
        deleteExistingCategory,
        setCategory
    });

    return (
        <PageContainer 
            className="md:max-h-screen" 
            title="Categories"
            description="Manage all product categories"
        >
            <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-5">
                <CategoriesControls 
                    setSearch={setSearch} 
                    category={category}
                    setCategory={setCategory}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    permissions={permissions}
                />
                <CustomizedTable  
                    data={data?.categories || []}
                    columns={columns}
                    showPagination={false} 
                    isLoading={isFetching}
                    noDataMessage="No Categories Found"
                />
            </Card>
        </PageContainer>
    )
}