import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";
import CustomizedTable from "../../components/ui/Table";
import { useDistributorSale } from "../../hooks/useDistributorSale";
import type { SortOption } from "../../types/type";
import type { DistributorSale } from "../../types/distributorSale.type";
import { formatDate, formatToPeso } from "../../utils/utils";
import DistributorSalesControls from "../../components/distributorSale/DistributorSalesControls";

const columns: ColumnDef<DistributorSale>[] = [
    {
        header: "Item",
        cell: ({ row }) => (
            <div className="min-w-30 flex gap-3 items-center">
                <img 
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-md object-cover" 
                    src={row.original.variant.image_url} 
                    alt={row.original.variant.variant_name}
                />
                <h1>{row.original.variant.variant_name}</h1>
            </div>
        ),
    },
    {
        header: 'Seller',
        cell: ({ row }) => (
            <div>
                <h1>{row.original.seller.distributor_name}</h1>
                <p className="text-gray">{row.original.seller.email}</p>
            </div>
        ),
        meta: { align: 'left' },
    },
    {
        header: "SKU",
        accessorKey: 'variant.sku',
        meta: { align: 'center' }
    },
    {
        header: "Quantity",
        accessorKey: 'quantity',
        meta: { align: 'center' }
    },
    {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: (info) => formatDate(info.getValue() as string),
        meta: { align: 'center' }
    },
    {
        header: "Sales",
        accessorKey: 'total_amount',
        cell: info => <span className="font-bold">{formatToPeso(info.getValue() as number)}</span>,
        meta: { align: 'center' }
    },
];

export default function AllDistributorSales () {
    const [sorting, setSorting] = useState<SortOption>({
        order: 'desc',
        sortBy: 'createdAt'
    });
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { getAllDistributorSales } = useDistributorSale();

    const { data, isFetching } = getAllDistributorSales({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sorting.sortBy,
        order: sorting.order,
        startDate,
        endDate,
        search: debouncedSearch
    });

    return (
        <PageContainer 
            className="md:max-h-screen" 
            title="Distributor Sales"
            description="View distributor sales including sold items and quantities."
        >
            <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-5">
                <DistributorSalesControls
                    sorting={sorting}
                    setSorting={setSorting}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setSearch={setSearch}
                />
                <CustomizedTable 
                    isLoading={isFetching}
                    data={data?.distributorSales || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Distributors Found"
                    total={data?.total || 0}
                />
            </Card>
            <div className="flex justify-end">
                <h1 className="font-bold mt-2 text-md md:text-lg">Total Sales: {formatToPeso(data?.totalSales || 0)}</h1>
            </div>
        </PageContainer>
    )
}