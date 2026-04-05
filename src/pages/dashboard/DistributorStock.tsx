import { useState } from "react";
import { useDistributorStock } from "../../hooks/useDistributorStock"
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDebounce } from "../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import { formatDate, formatToPeso } from "../../utils/utils";
import type { DistributorStock } from "../../types/distributor-stock.type";
import CustomizedTable from "../../components/ui/Table";
import { type SortOption } from "../../types/type";
import DistributorStockControls from "../../components/distributorStock/DistributorStockControls";
import DistributorInfo from "../../components/distributors/DistributorInfo";

const columns: ColumnDef<DistributorStock>[] = [
    {
        header: "Variant",
        accessorKey: "createdAt",
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
        meta: { align: 'left' },
    },
    {
        header: "SKU",
        accessorKey: 'variant.sku',
        meta: { align: 'center' }
    },
    {
        header: 'Product name',
        accessorKey: 'variant.product.product_name',
        meta: { align: 'center' },
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

export default function DistributorStock () {
    const params = useParams();
    const id = params.id;
    const { getDistributorStocks } = useDistributorStock();
    
    const [sorting, setSorting] = useState<SortOption>({
        order: 'desc',
        sortBy: 'updatedAt'
    })
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);

    const { data, isFetching } = getDistributorStocks(id || "", {
        search: debouncedSearch,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sorting.sortBy,
        order: sorting.order
    });

    return (
        <div className="flex flex-col gap-3 p-2 lg:p-6">
            <DistributorInfo id={id || ""} />
            <Card className="p-0">
                <h1 className="p-5 font-bold text-lg">Distributor Inventory</h1>
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
        </div>
    )
}