import { useMemo, useState } from "react";
import type { SortOption } from "../../types/type";
import { useDebounce } from "../../hooks/useDebounce";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDistributorSale } from "../../hooks/useDistributorSale";
import Card from "../ui/Card";
import CustomizedTable from "../ui/Table";
import DistributorSalesControls from "../distributorSale/DistributorSalesControls";
import { formatDate, formatToPeso } from "../../utils/utils";
import type { DistributorSale } from "../../types/distributorSale.type";
import Button from "../ui/Button";
import { Download } from "lucide-react";
import { distributorSaleService } from "../../service/distributorSaleService";
import Chip from "../ui/Chip";

const columns: ColumnDef<DistributorSale>[] = [
    {
        header: "Product",
        cell: ({ row }) => (
            <div className="min-w-50 flex gap-3 items-center">
                <img 
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-md object-cover" 
                    src={row.original.variant.image_url} 
                    alt={row.original.variant.variant_name}
                />
                <h1>{row.original.product.product_name}</h1>
            </div>
        ),
    },
    {
        header: 'Variant',
        cell: ({ row }) => (
            <div className="min-w-70">
                <Chip>{row.original.variant.variant_name}</Chip>
            </div>
        ),
        meta: { align: 'center' }
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

export default function DistributorSales ({ distributorId } : { distributorId: string }) {
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

    const params = useMemo(() => ({
        search: debouncedSearch,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sorting.sortBy,
        order: sorting.order
    }), [
        debouncedSearch,
        pagination.pageSize,
        pagination.pageIndex,
        sorting.sortBy,
        sorting.order
    ]);

    const debouncedParams = useDebounce(params, 500);
    const { data, isFetching } = getDistributorSales(distributorId, debouncedParams);

    const downloadDistributorSales = async () => {
        await distributorSaleService.downloadDistributorSales(distributorId, {
            limit: pagination.pageSize,
            page: pagination.pageIndex + 1,
            endDate,
            startDate,
            search
        });
    }

    return (
        <>
        <Card className="flex flex-col flex-1 min-h-0 space-y-5 p-0 pt-5">
            <div className="flex items-center justify-between px-5">
                <h1 className="font-bold text-lg">Distributor Sales</h1>
                <Button 
                    label="Export"
                    icon={<Download size={20} />}
                    onClick={downloadDistributorSales}
                />
            </div>
            <DistributorSalesControls
                sorting={sorting}
                setSorting={setSorting}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setSearch={setSearch}
                searchPlaceHolder="Search by product, variant or sku"
                setPagination={setPagination}
            />
            <CustomizedTable 
                isLoading={isFetching}
                data={data?.distributorSales || []}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                totalPages={data?.totalPages || 0}
                showPagination
                noDataMessage="No Sales Found"
                total={data?.total || 0}
            />
        </Card>
        </>
    )
}