import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import { useDistributor } from "../../hooks/useDistributor";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import { formatToPeso } from "../../utils/utils";
import type { TopDistributor } from "../../types/distributor.type";
import CustomizedTable from "../../components/ui/Table";
import { useNavigate } from "react-router-dom";
import type { SortOption } from "../../types/type";
import DistributorRankingControls from "../../components/distributorRankings/DistributorRankingControls";

const columns : ColumnDef<TopDistributor>[] = [
    {
        header: 'Rank',
        accessorKey: 'rank',
    },
    {
        header: "ID",
        accessorKey: "distributor.distributor_id",
        meta: { align: 'center '}
    },
    {
        header: "Name",
        accessorKey: "distributor.distributor_name",
        meta: { align: 'center '}
    },
    {
        header: "Wallet Balance",
        accessorKey: "distributor.wallet_balance",
        cell: info => formatToPeso(info.getValue() as number),
        meta: { align: 'center '}
    },
    {
        header: "Total Quantity Sold",
        accessorKey: "totalQuantity",
        meta: { align: 'center '}
    },
    {
        header: "Total Sales",
        accessorKey: "totalSales",
        cell: info => formatToPeso(info.getValue() as number),
        meta: { align: 'center '}
    },
]

export default function DistributorRankings () {
    const navigate = useNavigate();
    const { getTopDistributors } = useDistributor();

    const [sorting, setSorting] = useState<SortOption>({
        order: 'asc',
        sortBy: 'rank'
    });
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);

    const params = useMemo(() => ({
        search: debouncedSearch,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sorting.sortBy,
        order: sorting.order
    }), [debouncedSearch, pagination.pageSize, pagination.pageIndex, sorting.order, sorting.sortBy]);

    const { data, isFetching } = getTopDistributors(params);

    const onRowClick = (row : TopDistributor) => navigate(`/dashboard/distributors/${row.distributor._id}`) 

    return (
        <PageContainer
            title="Distributor Rankings"
            description="View and analyze top-performing distributors based on total sales and quantity sold"
        >
            <Card className="p-0 flex flex-col max-h-screen pt-5 gap-5">
                <DistributorRankingControls 
                    setPagination={setPagination}
                    setSearch={setSearch}
                    setSorting={setSorting}
                    sorting={sorting}
                />
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.topDistributors || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Distributors Found"
                    total={data?.total || 0}
                    onRowClick={onRowClick}
                />
            </Card>
        </PageContainer>
    )
}