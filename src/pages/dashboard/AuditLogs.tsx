import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable from "../../components/ui/Table";
import type { AuditLog } from "../../types/audit.type";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import { useAudit } from "../../hooks/useAudit";
import AuditLogsControls from "../../components/audits/AuditLogsControls";
import { useDebounce } from "../../hooks/useDebounce";
import Chip from "../../components/ui/Chip";

const severityColor: Record<"LOW" | "MEDIUM" | "HIGH" | "CRITICAL", string> = {
    LOW: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-orange-500",
    CRITICAL: "bg-red-500",
};

export default function AuditLogs () {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [role, setRole] = useState("");
    const [severity, setSeverity] = useState("");
    const [order, setOrder] = useState<"asc" | "desc">("desc");

    const { getAuditLogs } = useAudit();

    const params = {
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        search: debouncedSearch,
        startDate: startDate ? formatDate(startDate) : undefined,
        endDate: endDate ? formatDate(endDate) : undefined,
        role: role,
        severity: severity,
        order: order
    }

    const { data, isFetching } = getAuditLogs(params)

    const columns: ColumnDef<AuditLog>[] = [
        {
            header: "Date",
            accessorKey: "createdAt",
            cell: info => formatDate(info.getValue() as string),
            meta: { align: 'left' },
        },
        {
            header: "User",
            cell: ({ row }) => {
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
            cell: info => <Chip className="font-semibold">{info.getValue() as string}</Chip>,
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
            cell: info => (
                <Chip className="rounded-full px-3 py-1 flex items-center justify-center gap-2">
                    <span
                        className={`w-2.5 h-2.5 rounded-full ${severityColor[info.getValue() as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"]}`}
                    />
                    <span className="font-semibold">{info.getValue() as string}</span>
                </Chip>
            ),
            meta: { align: 'center' },
        },
        {
            header: "Device Info",
            accessorKey: "user_agent",
            meta: { align: 'center' },
        }
    ];

    return (
        <PageContainer 
            className="max-h-screen" 
            title="Audit Logs"
            description="View all system activity and changes"
        >
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
                />
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.auditLogs || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Audit Logs Found"
                    total={data?.total || 0}
                />
            </Card>
        </PageContainer>
    )
}