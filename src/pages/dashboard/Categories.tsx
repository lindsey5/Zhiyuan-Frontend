import { getCoreRowModel, useReactTable, type ColumnDef, type Row } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable, { TableSkeleton } from "../../components/ui/Table";
import { useCategory } from "../../hooks/useCategory";
import type { Category } from "../../types/category";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import CategoriesControls from "../../components/categories/CategoriesControls";
import Button from "../../components/ui/Button";
import { useRole } from "../../hooks/useRole";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import { promiseToast } from "../../utils/sileo";
import { useAuthStore } from "../../lib/store/authStore";

export default function Categories () {
    const { accessToken } = useAuthStore();

    const { getOwnRole } = useRole();
    const { data : role } = getOwnRole();
    const permissions =  role?.permissions || [];
    const { hasPermissions, hasAnyPermissions } = usePermissions();

    const [category, setCategory] = useState<Category>();
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);

    const { getCategories, deleteCategory } = useCategory();
    const { data, isLoading } = getCategories({ search: debouncedSearch });

    const deleteExistingCategory = (id: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");
        if (!isConfirmed) return;

        promiseToast(deleteCategory.mutateAsync({ id, accessToken: accessToken || "" }), "top-center", "Category succesfully deleted.")
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
                    <div className="flex gap-3 text-sm justify-center">
                        {hasPermissions([PERMISSIONS.CATEGORY_UPDATE], permissions) && (
                            <Button
                                label="Edit"
                                onClick={() => {
                                    setCategory(row.original);
                                    setShowModal(true);
                                }}
                            />
                        )}

                        {hasPermissions([PERMISSIONS.CATEGORY_DELETE], permissions) && (
                            <Button
                                label="Delete"
                                className="bg-red-600 text-white"
                                onClick={() => deleteExistingCategory(row.original.id)}
                            />
                        )}
                    </div>
                ),
                meta: { align: 'center' },
            },
        ]
        : []),
    ];

    const table = useReactTable({
        data: data?.categories ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <PageContainer className="h-screen" title="Categories">
            <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-10">
                <CategoriesControls 
                    setSearch={setSearch} 
                    category={category}
                    setCategory={setCategory}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    permissions={permissions}
                />
                {isLoading ? 
                    <TableSkeleton columns={columns.length}/> 
                    : 
                    <CustomizedTable 
                        table={table} 
                        showPagination={false} 
                        noDataMessage="No Categories Found"
                    />
                }
            </Card>
        </PageContainer>
    )
}