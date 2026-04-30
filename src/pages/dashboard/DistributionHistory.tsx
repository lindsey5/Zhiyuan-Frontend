import type { ColumnDef, PaginationState, Row } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import type { StockTransferLog } from "../../types/stock-transfer-log.type";
import { formatDate } from "../../utils/utils";
import { useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useStockTransfer } from "../../hooks/useStockTransfer";
import CustomizedTable from "../../components/ui/Table";
import StockTransferLogsControls from "../../components/stockTransferLog/StockTransferLogControls";
import StockTransferItems from "../../components/stockTransferLog/StockTransferItems";
import { Eye } from "lucide-react";
import IconButton from "../../components/ui/IconButton";
import DeliveryStatusChip from "../../components/shared/DeliveryStatusChip";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";

interface DistributionHistoryColsParams{
    openModal: (transferLog : StockTransferLog) => void;
    getOwn: boolean;
}

const getColumns = ({ openModal, getOwn } : DistributionHistoryColsParams) : ColumnDef<StockTransferLog>[] => [
    {
        header: "Transfer No.",
        accessorKey: "transfer_no",
        meta: { align: 'left' },
    },
    {
        header: "Receiver",
        cell: ({ row }) => (
            <div>
                <h3 className="font-bold">{row.original.receiver.distributor_name}</h3>
                <p className="text-gray">{row.original.receiver.email}</p>
            </div>
        ),
        meta: { align: 'left' },
    },
    ...(!getOwn ? [
        {
            header: "Sender",
            cell: ({ row } : { row : Row<StockTransferLog>}) => (
                <div>
                    <h3 className="font-bold">{`${row.original.sender.firstname} ${row.original.sender.lastname}`}</h3>
                    <p className="text-gray">{row.original.sender.email}</p>
                </div>
            ),
            meta: { align: 'left' },
        },
    ] : []),
    {
        header: "Status",
        accessorKey: "status",
        cell: info => <div className="flex justify-center">
            <DeliveryStatusChip status={info.getValue() as string}/>
        </div>,
        meta: { align: 'center' },
    },
    {
        header: "Date",
        accessorKey: "createdAt",
        cell: info => formatDate(info.getValue() as string),
        meta: { align: 'center' },
    },
    {
        header: 'Action',
        cell: ({ row }) => (
            <IconButton
                onClick={() => openModal(row.original)}
                icon={<Eye className="text-gold"/>}
            />
        ),
        meta: { align: 'center' }
    }
];

export default function DistributionHistory () {
    const { hasPermissions } = usePermissions();
    const hasGetOwnPermission = hasPermissions([PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_ALL]) ? false : hasPermissions([PERMISSIONS.STOCK_DISTRIBUTION_HISTORY_VIEW_OWN]);
    const [getOwn, setGetOwn] = useState(hasGetOwnPermission);

    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);

    const [status, setStatus] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const params = useMemo(() => ({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        search: debouncedSearch,
        startDate: startDate ? formatDate(startDate) :"",
        endDate: endDate ? formatDate(endDate) : "",
        status,
    }), [pagination, debouncedSearch, startDate, endDate, status]);

    const { getStockTransferLogs, getMyStockTransferLogs } = useStockTransfer();
    const { data, isFetching } = getOwn ? getMyStockTransferLogs(params) : getStockTransferLogs(params);

    const [stockTransferLog, setStockTransferLog] = useState<StockTransferLog | null>(null);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false)
        setStockTransferLog(null)
    }

    const openModal = (transferLog : StockTransferLog) => {
        setShowModal(true)
        setStockTransferLog(transferLog)
    }

    const columns = getColumns({ openModal,getOwn });

    const onRowClick = (row : StockTransferLog) => {
        openModal(row);
    }

    return (
        <PageContainer
            title="Distribution History"
            description="View and manage the complete history of stock distributions"
        >
            <StockTransferItems 
                open={showModal}
                close={closeModal}
                transfer_id={stockTransferLog?._id || null}
            />
            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-10">
                <StockTransferLogsControls 
                    startDate={startDate}
                    endDate={endDate}
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setPagination={setPagination}
                    status={status}
                    setStatus={setStatus}
                    getOwn={getOwn}
                    setGetOwn={setGetOwn}
                />
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.stockTransferLogs || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Data"
                    total={data?.total || 0}
                    onRowClick={onRowClick}
                />
            </Card>
        </PageContainer>
    )
}