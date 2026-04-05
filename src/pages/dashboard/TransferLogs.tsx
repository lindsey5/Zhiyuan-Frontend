import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import type { StockTransferLog } from "../../types/stock-transfer-log.type";
import { formatDate } from "../../utils/utils";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useStockTransfer } from "../../hooks/useStockTransfer";
import CustomizedTable from "../../components/ui/Table";
import StockTransferLogsControls from "../../components/stockTransferLog/StockTransferLogControls";
import StockTransferItems from "../../components/stockTransferLog/StockTransferItems";
import { Eye } from "lucide-react";
import IconButton from "../../components/ui/IconButton";

export default function TransferLogs () {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const params = {
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        search: debouncedSearch,
        startDate: startDate ? formatDate(startDate) :"",
        endDate: endDate ? formatDate(endDate) : "",
    }
    const { getStockTransferLogs } = useStockTransfer();
    const { data, isFetching } = getStockTransferLogs(params);

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

    const columns: ColumnDef<StockTransferLog>[] = [
        {
            header: "Receiver",
            cell: ({ row }) => (
                <div>
                    <h3 className="font-bold">{row.original.receiver.distributor_name}</h3>
                    <p>{row.original.receiver.email}</p>
                </div>
            ),
            meta: { align: 'left' },
        },
        {
            header: "Sender",
            cell: ({ row }) => (
                <div>
                    <h3 className="font-bold">{`${row.original.sender.firstname} ${row.original.sender.lastname}`}</h3>
                    <p>{row.original.sender.email}</p>
                </div>
            ),
            meta: { align: 'left' },
        },
        {
            header: "Description",
            accessorKey: "description",
            cell: ({ row }) => `${row.original.receiver.distributor_name} receives ${row.original.items.reduce((acc, item) => acc + item.quantity, 0)} stocks`,
            meta: { align: 'left' },
        },
        {
            header: "Date",
            accessorKey: "createdAt",
            cell: info => formatDate(info.getValue() as string),
            meta: { align: 'left' },
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


    return (
        <PageContainer
            title="Transfer Logs"
            description="View the history of stock transfers form admin to distributors"
        >
            <StockTransferItems 
                open={showModal}
                close={closeModal}
                stockTransferLog={(stockTransferLog)}
            />
            <Card className="p-0 flex flex-col flex-1 min-h-0 space-y-5 pt-10">
                <StockTransferLogsControls 
                    setSearch={setSearch}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.stockTransferLogs || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Transfer Logs Found"
                    total={data?.total || 0}
                />
            </Card>
        </PageContainer>
    )
}