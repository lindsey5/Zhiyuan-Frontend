import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import { useWithdrawalRequest } from "../../hooks/useWithdrawalRequest";
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import { formatDate, formatToPeso } from "../../utils/utils";
import type { WithdrawalRequest } from "../../types/withdrawalRequest.type";
import DeliveryStatusChip from "../../components/shared/DeliveryStatusChip";
import IconButton from "../../components/ui/IconButton";
import { Eye } from "lucide-react";
import CustomizedTable from "../../components/ui/Table";
import WithdrawalRequestDetails from "../../components/withdrawalRequest/WithdrawalRequestDetails";
import { useSearchParams } from "react-router-dom";
import WithdrawalRequestControls from "../../components/withdrawalRequest/WithdrawalRequestControls";

const getColumns = (setWithdrawalId : Dispatch<SetStateAction<string | null>>) : ColumnDef<WithdrawalRequest>[] => [
    {
        header: "Requested By",
        cell: ({ row }) => (
            <div>
                <h1>{row.original.distributor.distributor_name}</h1>
                <p className="text-gray">{row.original.distributor.email}</p>
            </div>
        ),
        meta: { align: 'left' },
    },
    {
        header: "Distributor ID",
        accessorKey: "distributor.distributor_id",
        meta: { align: 'center' },
    },
    {
        header: 'Status',
        accessorKey: "status",
        cell: info => (
            <div className="flex justify-center">
                <DeliveryStatusChip status={info.getValue() as string} />
            </div>
        ),
        meta: { align: 'center' },
    },
    {
        header: 'Withdrawal Method',
        accessorKey: 'withdrawal_method.type',
        cell: info => <span className="capitalize">{info.getValue() as string}</span>,
        meta: { align: 'center' },
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
        cell: info => formatToPeso(Number(info.getValue())),
        meta: { align: 'center' },
    },
    {
        header: 'Date Requested',
        accessorKey: 'createdAt',
        cell: info => formatDate(info.getValue() as string),
        meta: { align: 'center' },
    },
    {
        header: 'Action',
        cell: ({ row }) => (
            <IconButton 
                icon={<Eye size={20}/>} 
                onClick={() => setWithdrawalId(row.original._id)}
            />
        ),
        meta: { align: 'center' },
    },
]

export default function WithdrawalRequests () {
    const [searchParams, setSearchParams] = useSearchParams();

    const withdrawal_id = searchParams.get("withdrawal_id");

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [status, setStatus] = useState("");

    const params = useMemo(() => ({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: debouncedSearch,
        startDate: startDate ? formatDate(startDate) : "",
        endDate: endDate ? formatDate(endDate) : "",
        status,
    }), [
        pagination,
        debouncedSearch,
        startDate,
        endDate,
        status,
    ])

    const { getWithdrawalRequests } = useWithdrawalRequest();
    const { data, isFetching } = getWithdrawalRequests(params);
    const [withdrawalId, setWithdrawalId] = useState<string | null>(null);

    const columns = getColumns(setWithdrawalId);

    const onRowClick = (row : WithdrawalRequest) => setWithdrawalId(row._id)

    useEffect(() => {
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

        const isReload = navEntry?.type === "reload";

        if (isReload && withdrawal_id) {
            setSearchParams({}, { replace: true });
        }
    }, [withdrawal_id]);

    return (
        <PageContainer 
            title="Withdrawal Requests"
            description="View and manage all withdrawal requests"
        >
            <WithdrawalRequestDetails 
                withdrawal_id={withdrawalId}
                close={() => setWithdrawalId(null)}
            />
            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-5">
                <WithdrawalRequestControls 
                    startDate={startDate}
                    endDate={endDate}
                    search={search}
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    status={status}
                    setStatus={setStatus}
                    setPagination={setPagination}
                />
                <CustomizedTable 
                    data={data?.withdrawalRequests || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    isLoading={isFetching}
                    noDataMessage="No Withdrawal Requests Found"
                    total={data?.total || 0}
                    onRowClick={onRowClick}
                />
            </Card>
        </PageContainer>
    )
}