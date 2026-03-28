import { getCoreRowModel, useReactTable, type ColumnDef, type PaginationState } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable, { TableSkeleton } from "../../components/ui/Table";
import type { AuditLog } from "../../types/audit.type";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import { useAudit } from "../../hooks/useAudit";
import AuditLogsControls from "../../components/audits/AuditLogsControls";
import { useDebounce } from "../../hooks/useDebounce";

const severityColor: Record<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL", string> = {
    LOW: "bg-green-700",
    MEDIUM: "bg-yellow-700",
    HIGH: "bg-orange-700",
    CRITICAL: "bg-red-700",
};

export default function AuditLogs () {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [role, setRole] = useState("");
    const [severity, setSeverity] = useState("");
    const [order, setOrder] = useState<"ASC" | "DESC">("DESC");

    const { getAuditLogs } = useAudit();
    const { data, isLoading } = getAuditLogs({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        search: debouncedSearch,
        startDate: startDate ? formatDate(startDate) : undefined,
        endDate: endDate ? formatDate(endDate) : undefined,
        role: role,
        severity: severity,
        order: order
    })

    const columns: ColumnDef<AuditLog>[] = [
        {
            header: "Date",
            accessorKey: "createdAt",
            cell: info => formatDate(info.getValue() as string),
            meta: { align: 'left' },
        },
        {
            header: "User",
            accessorKey: "category",
            cell: ({ row}) => {
                const fullname = `${row.original.user.firstname} ${row.original.user.lastname}`;
                const email = row.original.user.email;

                return <div>
                    <h3>{fullname}</h3>
                    <p>{email}</p>
                </div>
            },
            meta: { align: 'center' },
        },
        {
            header: "Role",
            accessorKey: "role",
            cell: info => <div className="bg-chip text-primary px-3 py-1 rounded-full">{info.getValue() as string}</div>,
            meta: { align: 'center' },
        },
        {
            header: "Action",
            accessorKey: "action",
            meta: { align: 'center' },
        },
        {
            header: "Description",
            accessorKey: "description",
            meta: { align: 'center' },
        },
        {
            header: "Severity",
            accessorKey: "severity",
            cell: ({ row }) => (
                <div className="bg-chip rounded-full px-3 py-1 flex items-center justify-center gap-2">
                    <span
                        className={`w-2.5 h-2.5 rounded-full ${severityColor[row.original.severity]}`}
                    />
                    <span className="font-semibold">{row.original.severity}</span>
                </div>
            ),
            meta: { align: 'center' },
        },
        {
            header: "Device Info",
            accessorKey: "user_agent",
            meta: { align: 'center' },
        }
    ];

    const table = useReactTable({
        data: data?.auditLogs || [],
        columns,
        pageCount: data?.totalPages || 0,
        state: { pagination },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    return (
        <PageContainer className="h-screen" title="Audit Logs">
            <Card className="p-0 flex flex-col flex-1 min-h-0 pt-10">
                <AuditLogsControls
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    role={role}
                    setRole={setRole}
                    severity={severity}
                    setSeverity={setSeverity}
                    order={order}
                    setOrder={setOrder}
                />;
                {isLoading ? 
                    <TableSkeleton columns={columns.length}/> 
                    : 
                    <CustomizedTable 
                        table={table} 
                        showPagination
                        noDataMessage="No Audit Logs Found"
                    />
                }
            </Card>
        </PageContainer>
    )
}