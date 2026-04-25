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
import { distributorStockService } from "../../service/distributorStockService";
import Button from "../ui/Button";
import { Download } from "lucide-react";
import { PERMISSIONS } from "../../config/permission";
import GoldButton from "../ui/GoldButton";
import { useNavigate } from "react-router-dom";
import usePermissions from "../../hooks/usePermissions";

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
    const navigate = useNavigate();
    const { hasPermissions } = usePermissions();
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

    const downloadInventory = async () => {
        await distributorStockService.downloadDistributorStocks(distributorId, {
            order: sorting.order,
            search: debouncedSearch,
            sortBy: sorting.sortBy
        })
    }

    return (
        <>
        {hasPermissions([PERMISSIONS.STOCK_DISTRIBUTION_CREATE]) && (
            <div className="flex justify-end">
                <GoldButton
                    className="text-sm"
                    onClick={() => navigate(`/dashboard/distributors/transfer-stocks?id=${distributorId}`)}
                >
                    Distribute Stocks
                </GoldButton>
            </div>
        )}
        <Card className="p-0 max-h-screen flex flex-col gap-3 pt-5">
            <h1 className="px-5 font-bold text-lg">Distributor Inventory</h1>
            <div className="flex justify-end px-5">
                <Button 
                    label="Export"
                    icon={<Download size={20} />}
                    onClick={downloadInventory}
                />
            </div>
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
        </>
    )
}