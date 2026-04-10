import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import type { DistributorStock } from "../../types/distributor-stock.type";
import Card from "../ui/Card";
import { formatDate, formatToPeso } from "../../utils/utils";
import DistributorStockControls from "./DistributorStockControls";
import { useDistributorStock } from "../../hooks/useDistributorStock";
import { useMemo, useState } from "react";
import type { SortOption } from "../../types/type";
import { useDebounce } from "../../hooks/useDebounce";
import CustomizedTable from "../ui/Table";
import Chip from "../ui/Chip";

const columns: ColumnDef<DistributorStock>[] = [
    {
        header: "Variant",
        accessorKey: "createdAt",
        cell: ({ row }) => (
            <div className="min-w-50 flex gap-3 items-center">
                <img 
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-md object-cover" 
                    src={row.original.variant.image_url} 
                    alt={row.original.variant.product.product_name}
                />
                <h1>{row.original.variant.product.product_name}</h1>
            </div>
        ),
        meta: { align: 'left' },
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
        header: "Price",
        cell: ({ row }) => formatToPeso(row.original.variant.price),
        meta: { align: 'center' }
    },
    {
        header: 'Updated At',
        accessorKey: 'updatedAt',
        cell: ({ row }) => formatDate(row.original.updatedAt),
        meta: { align: 'center' }
    }
];

export default function DistributorInventory ({ distributorId } : { distributorId: string }) {
    const { getDistributorStocks } = useDistributorStock();
    
    const [sorting, setSorting] = useState<SortOption>({
        order: 'desc',
        sortBy: 'updatedAt'
    })
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);

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

    const debouncedParams = useDebounce(params, 800);
    const { data, isFetching } = getDistributorStocks(distributorId, debouncedParams);

    return (
        <Card className="p-0 min-h-0 flex-1 flex flex-col gap-3 pt-5">
            <h1 className="px-5 font-bold text-lg">Distributor Inventory</h1>
            <DistributorStockControls 
                setSearch={setSearch}
                setSorting={setSorting}
                sorting={sorting}
            />
            <CustomizedTable 
                isLoading={isFetching}
                data={data?.distributorStocks || []}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                totalPages={data?.totalPages || 0}
                showPagination
                noDataMessage="No Available Stock"
                total={data?.total || 0}
            />
        </Card>
    )
}