import { useState } from "react";
import type { SortOption } from "../../types/type";
import { useDebounce } from "../../hooks/useDebounce";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDistributorSale } from "../../hooks/useDistributorSale";
import Card from "../ui/Card";
import CustomizedTable from "../ui/Table";
import DistributorSalesControls from "../distributorSale/DistributorSalesControls";
import { formatDate, formatToPeso } from "../../utils/utils";
import type { DistributorSale } from "../../types/distributorSale.type";

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

export default function DistributorSales () {
    const [sorting, setSorting] = useState<SortOption>({
        order: 'desc',
        sortBy: 'createdAt'
    });
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { getDistributorSales } = useDistributorSale();

    const { data, isFetching } = getDistributorSales({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sorting.sortBy,
        order: sorting.order,
        startDate,
        endDate,
        search: debouncedSearch
    });

    return (
        <>
        <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-5">
            <DistributorSalesControls
                sorting={sorting}
                setSorting={setSorting}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setSearch={setSearch}
                searchPlaceHolder="Search by item name or sku"
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
        </>
    )
}