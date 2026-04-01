import { getCoreRowModel, useReactTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable, { TableSkeleton } from "../../components/ui/Table";
import type { Distributor } from "../../types/distributor.type";
import { PERMISSIONS } from "../../config/permission";
import usePermissions from "../../hooks/usePermissions";
import { useRole } from "../../hooks/useRole";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAuthStore } from "../../lib/store/authStore";
import { useDistributor } from "../../hooks/useDistributor";
import DistributorControls from "../../components/user/distributors/DistributorsControls";
import { Trash } from "lucide-react";

export default function Distributors () {
    const accessToken = useAuthStore().accessToken;
    const { getOwnRole } = useRole();
    const { data : roleData } = getOwnRole(accessToken || "");
    const permissions = roleData?.permissions || [];
    const { hasAnyPermissions, hasPermissions} = usePermissions();

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [showModal, setShowModal] = useState(false);

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const { getDistributors } = useDistributor();
    const { data, isLoading } = getDistributors(
        {
            page: pagination.pageIndex + 1, 
            limit: pagination.pageSize,
            search: debouncedSearch,
        },
        accessToken || ""
    );

    const columns: ColumnDef<Distributor>[] = [
        {
            header: "Name",
            accessorKey: "distributor_name",
            meta: { align: 'left' },
        },
        {
            header: "Email",
            accessorKey: "email",
            meta: { align: 'center' },
        },
        {
            header: "Commision Rate",
            accessorKey: "commission_rate",
            cell: info => `${info.getValue()}%`,
            meta: { align: 'center' },
        },
        {
            header: "Recruit by",
            accessorKey: 'recruiter',
            cell: ({ row }) => {
                if(!row.original.recruiter) return 'N/A';

                return <div>
                    <h1>{row.original.recruiter.distributor_name}</h1>
                    <p>{row.original.recruiter.email}</p>
                </div>
            },
            meta: { align: 'center' },
        },
        ...(hasAnyPermissions([ PERMISSIONS.DISTRIBUTOR_DELETE], permissions)
            ? [
                {
                    header: "Action",
                    cell: () => (
                        <div className="flex gap-3 text-sm justify-center">
                            {hasPermissions([PERMISSIONS.DISTRIBUTOR_DELETE], permissions) && (
                                <Button
                                    className="border-none"
                                    icon={<Trash size={20} color="red"/>}
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
        data: data?.distributors ?? [],
        columns,
        pageCount: data?.totalPages || 0,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    return (
        <PageContainer 
            title="Distributors" 
            description="View and manage distributor accounts"
            className="h-screen" 
        >
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5 pt-10">
                <DistributorControls 
                    permissions={permissions}
                    setSearch={setSearch}
                    setShowModal={setShowModal}
                    showModal={showModal}
                />
                {isLoading ? <TableSkeleton columns={columns.length} /> : (
                    <CustomizedTable 
                        table={table}
                        showPagination
                        noDataMessage="No Distributors Found"
                    />
                )}
            </Card>
        </PageContainer>
    )
}
