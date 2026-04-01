import { getCoreRowModel, useReactTable, type ColumnDef, type PaginationState, type Row } from "@tanstack/react-table";
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
import DistributorControls from "../../components/distributors/DistributorsControls";
import { formatDate } from "../../utils/utils";

export default function Distributors () {
    const accessToken = useAuthStore().accessToken;
    const { getOwnRole } = useRole();
    const { data : roleData } = getOwnRole(accessToken || "");
    const permissions = roleData?.permissions || [];
    const { hasAnyPermissions, hasPermissions} = usePermissions();

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const [distributor, setDistributor] = useState<Distributor>();
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
        {
            header: "Creator",
            accessorKey: 'user',
            cell: ({ row }) => {
                if(!row.original.user) return 'N/A';

                return <div>
                    <h1 className="font-semibold">{row.original.user.firstname} {row.original.user.lastname}</h1>
                    <p>{row.original.user.email}</p>
                </div>
            },
            meta: { align: 'center' },
        },

        ...(hasAnyPermissions([ PERMISSIONS.DISTRIBUTOR_DELETE, PERMISSIONS.DISTRIBUTOR_UPDATE], permissions)
            ? [
                {
                    header: "Action",
                    cell: ({ row }: { row: Row<Distributor> }) => (
                        <div className="flex gap-3 text-sm justify-center">
                            {hasPermissions([PERMISSIONS.DISTRIBUTOR_UPDATE], permissions) && (
                                <Button
                                    label="Edit"
                                    onClick={() => {
                                        setShowModal(true)
                                        setDistributor(row.original)
                                   }}
                                />
                            )}
    
                            {hasPermissions([PERMISSIONS.DISTRIBUTOR_DELETE], permissions) && (
                                <Button
                                    label="Delete"
                                    className="bg-red-600 text-white"
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
                    setDistributor={setDistributor}
                    setSearch={setSearch}
                    setShowModal={setShowModal}
                    distributor={distributor}
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
