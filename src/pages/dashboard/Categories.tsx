import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable from "../../components/ui/Table";
import { useCategory } from "../../hooks/useCategory";
import type { Category } from "../../types/category";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import CategoriesControls from "../../components/categories/CategoriesControls";

export default function Categories () {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const { getCategories } = useCategory();
    const { data } = getCategories({ search: debouncedSearch });

    const columns: ColumnDef<Category>[] = [
        {
            header: "Category",
            accessorKey: "Category Name",
            cell: ({ row }) => row.original.name
        },
        {
            header: "Created At",
            cell: ({ row }) => formatDate(row.original.createdAt)
        },
        {
            header: "Action",
            cell: ({ row }) => (
                <div className="flex gap-3 text-sm">
                    <button>
                        Edit
                    </button>
                    <button>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: data?.categories ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <PageContainer className="h-screen" title="Categories">
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5">
                <CategoriesControls setSearch={setSearch}/>
                <CustomizedTable table={table}/>
            </Card>
        </PageContainer>
    )
}