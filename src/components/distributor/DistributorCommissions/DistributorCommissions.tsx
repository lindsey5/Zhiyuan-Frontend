import { useMemo, useState } from "react";
import { useCommissionLog } from "../../../hooks/useCommissionLog"
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import DateInput from "../../ui/DateInput";
import Card from "../../ui/Card";
import CustomizedTable from "../../ui/Table";
import type { CommissionLog } from "../../../types/commissionLog.type";
import { formatDate, formatToPeso } from "../../../utils/utils";
import IconButton from "../../ui/IconButton";
import { Eye } from "lucide-react";
import CommissionLogModal from "./CommissionLogModal";

export default function DistributorCommissions ({ distributorId } : { distributorId: string}) {
    const [commission, setCommission] = useState<CommissionLog | null>(null);
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    
    const params = useMemo(() => ({
        startDate,
        endDate,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
    }), [
        startDate,
        endDate,
        pagination.pageIndex,
        pagination.pageSize
    ])
    
    const { getCommissions } = useCommissionLog();
    const { data, isFetching } = getCommissions({
        params,
        distributor_id: distributorId
    })

    const columns: ColumnDef<CommissionLog>[] = [
        {
            header: 'Date',
            accessorKey: 'createdAt',
            cell: (info) => formatDate(info.getValue() as string),
            meta: { align: 'center' }
        },
        {
            header: 'Commission Rate',
            accessorKey: 'commission_rate',
            cell: info => `${info.getValue()}%`,
            meta: { align: 'center' }
        },
        {
            header: 'Commission',
            accessorKey: 'commission_amount',
            cell: (info) => formatToPeso(Number(info.getValue())),
            meta: { align: 'center' }
        },
        {
            header: 'Action',
            cell: ({ row })  => (
                <IconButton 
                    icon={<Eye size={20}/>}
                    onClick={() => setCommission(row.original)}
                />
            ),
            meta: { align: 'center' }
        }
    ]

    return (
        <Card className="flex flex-col max-h-screen space-y-5 p-0 pt-5">
            <CommissionLogModal 
                close={() => setCommission(null)}
                open={commission !== null}
                commissionLog={commission}
            />
            <div className="flex gap-3 px-5">
                <DateInput 
                    label="From"
                    onChange={(value) => {
                        setPagination(prev => ({...prev, pageIndex: 0}))
                        setStartDate(value);
                    }}
                    value={startDate}
                />
                <DateInput 
                    label="To"
                    onChange={(value) => {
                        setPagination(prev => ({...prev, pageIndex: 0}));
                        setEndDate(value);
                    }}
                    value={endDate}
                />
            </div>
            <CustomizedTable 
                isLoading={isFetching}
                data={data?.commissions || []}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                totalPages={data?.totalPages || 0}
                showPagination
                noDataMessage="No Sales Found"
                total={data?.total || 0}
            />
        </Card>
    )
}