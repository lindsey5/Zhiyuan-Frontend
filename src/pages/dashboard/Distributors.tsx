import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable from "../../components/ui/Table";
import { formatDate, formatToPeso } from "../../utils/utils";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDistributor } from "../../hooks/useDistributor";
import type { Distributor } from "../../types/distributor.type";
import GoldButton from "../../components/ui/GoldButton";

export default function Distributors () {
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const { getDistributors } = useDistributor();

    const { data, isFetching } = getDistributors({
        search: debouncedSearch,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sortBy,
        order: order
    });

    const columns: ColumnDef<Distributor>[] = [
        {
            header: "Name",
            accessorKey: "distributor_name",
            meta: { align: 'left '}
        },
        {
            header: "Email",
            accessorKey: "email",
            meta: { align: 'center '}
        },
        {
            header: "Commission Rate",
            cell: ({ row }) => `${row.original.commission_rate} %`,
            meta: { align: 'center '}
        },
        {
            header: "Recruit by",
            cell: ({ row }) => row.original.parent_distributor ? row.original.parent_distributor.distributor_name : "N/A",
            meta: { align: 'center '}
        },
        {
            header: "Wallet Balance",
            accessorKey: "wallet_balance",
            cell: ({ row }) => formatToPeso(row.original.wallet_balance),
            meta: { align: 'center '}
        },
        {
            header: "Total Stocks",
            accessorKey: "total_stocks",
            meta: { align: 'center '}
        },
        {
            header: "Date Created",
            accessorKey: "createdAt",
            cell: ({ row }) => formatDate(row.original.createdAt),
            meta: { align: 'center '}
        }
    ]

    return (
        <PageContainer 
            className="max-h-screen" 
            title="Distributor Management"
            description="View and manage distributors"
        >
            <Card className="p-0 flex flex-col flex-1 min-h-0 pt-10">
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.distributors || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Audit Logs Found"
                    total={data?.total || 0}
                />
            </Card>
            <div className="flex justify-end">
                <GoldButton
                    className="text-sm"
                >Create Distributor</GoldButton>
            </div>
        </PageContainer>
    )
}