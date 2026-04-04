import { type ColumnDef, type Row } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable from "../../components/ui/Table";
import { useCategory } from "../../hooks/useCategory";
import type { Category } from "../../types/category.type";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import CategoriesControls from "../../components/categories/CategoriesControls";
import Button from "../../components/ui/Button";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import { promiseToast } from "../../utils/sileo";

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

    const columns: ColumnDef<Category>[] = [
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
                    <div className="flex flex-col md:flex-row gap-3 text-sm justify-center">
                        {hasPermissions([PERMISSIONS.CATEGORY_UPDATE], permissions) && (
                            <Button
                                label="Edit"
                                className="p-1 md:p-3"
                                onClick={() => {
                                    setCategory(row.original);
                                    setShowModal(true);
                                }}
                            />
                        )}

                        {hasPermissions([PERMISSIONS.CATEGORY_DELETE], permissions) && (
                            <Button
                                label="Delete"
                                className="bg-red-600 text-white p-1 md:p-3"
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

    return (
        <PageContainer 
            className="max-h-screen" 
            title="Categories"
            description="Manage all product categories"
        >
            <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-10">
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