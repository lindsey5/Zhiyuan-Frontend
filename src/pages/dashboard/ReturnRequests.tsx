import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import PageContainer from "../../components/ui/PageContainer";
import { useDebounce } from "../../hooks/useDebounce";
import React, { useMemo, useState, type SetStateAction } from "react";
import { formatDate } from "../../utils/utils";
import { useReturnRequest } from "../../hooks/useReturnRequest";
import Card from "../../components/ui/Card";
import type { ReturnRequest } from "../../types/returnRequest.type";
import CustomizedTable from "../../components/ui/Table";
import IconButton from "../../components/ui/IconButton";
import { Eye } from "lucide-react";
import ReturnRequestModal from "../../components/return-request/ReturnRequestModal";
import ReturnRequestControls from "../../components/return-request/ReturnRequestControls";

const getColumns = (setReturnRequest : React.Dispatch<SetStateAction<ReturnRequest | null>>) : ColumnDef<ReturnRequest>[] => [
    {
        header: "Request by",
        cell: ({ row }) => (
            <div>
                <h1>{row.original.distributor.distributor_name}</h1>
                <p className="text-gray">{row.original.distributor.email}</p>
            </div>
        )
    },
    {
        header: "Distributor ID",
        accessorKey: 'distributor.distributor_id',
        cell: info => info.getValue(),
        meta: { align: 'center' }
    },
    {
        header: 'Reason',
        accessorKey: 'reason',
        cell: info => <div className="max-w-50 truncate">{info.getValue() as string}</div>,
        meta: { align: 'center' }
    },
    {
        header: 'Total Items',
        cell: ({ row }) => row.original.items.length,
        meta: { align: 'center' }
    },
    {
        header: 'Pending Items',
        cell: ({ row }) => row.original.items.map(item => ['pending', 'accepted'].includes(item.status) ? item : null).filter(item => item).length || 'N/A',
        meta: { align: 'center' }
    },
    {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: info => formatDate(info.getValue() as string),
        meta: { align: 'center' }
    },
    {
        header: 'Action',
        cell: ({ row }) => (
            <IconButton 
                icon={<Eye size={20} />}
                onClick={() => setReturnRequest(row.original)} 
            />
        ),
        meta: { align: 'center' }
    }
]

export default function ReturnRequests () {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [returnRequest, setReturnRequest] = useState<ReturnRequest | null>(null);

    const params = useMemo(() => ({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        search: debouncedSearch,
        startDate: startDate ? formatDate(startDate) : undefined,
        endDate: endDate ? formatDate(endDate) : undefined,
        order
    }), [
        pagination.pageSize,
        pagination.pageIndex,
        debouncedSearch,
        startDate,
        endDate,
        order
    ]);
    const debouncedParams = useDebounce(params, 500);

    const { getReturnRequests } = useReturnRequest();
    const { data, isFetching } = getReturnRequests(debouncedParams);

    const onRowClick = (row : ReturnRequest) => {
        setReturnRequest(row)
    }

    return (
        <PageContainer
            title="Return Requests"
            description="Manage and review all return requests submitted by distributors."
        >
            <ReturnRequestModal 
                close={() => setReturnRequest(null)}
                open={returnRequest !== null}
                return_id={returnRequest?._id || null}
            />
            <Card className="p-0 flex flex-col max-h-screen pt-10">
                <ReturnRequestControls 
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    order={order}
                    setOrder={setOrder}
                    setPagination={setPagination}
                    setSearch={setSearch}
                />
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.returnRequests || []}
                    columns={getColumns(setReturnRequest)}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Return Requests Found"
                    total={data?.total || 0}
                    onRowClick={onRowClick}
                />
            </Card>
        </PageContainer>
    )
}