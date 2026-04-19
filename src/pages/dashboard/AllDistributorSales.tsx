import { useMemo, useState } from "react";
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
import { distributorSaleService } from "../../service/distributorSaleService";
import Button from "../../components/ui/Button";
import { Download, Eye } from "lucide-react";
import Chip from "../../components/ui/Chip";
import IconButton from "../../components/ui/IconButton";
import DistributorSalesModal from "../../components/distributorSale/DistributorSalesModal";

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
    const [distributorSale, setDistributorSale] = useState<DistributorSale | null>(null);

    const params = useMemo(() => ({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sorting.sortBy,
        order: sorting.order,
        startDate,
        endDate,
        search: debouncedSearch
    }), [pagination.pageSize, pagination.pageIndex, sorting.sortBy, sorting.order, startDate, endDate, debouncedSearch]);

    const debouncedParams = useDebounce(params, 500);
    const { getAllDistributorSales } = useDistributorSale();
    const { data, isFetching } = getAllDistributorSales(debouncedParams);

    const downloadDistributorSales = async () => {
        await distributorSaleService.downloadAllDistributorSales({
            limit: pagination.pageSize,
            page: pagination.pageIndex + 1,
            endDate,
            startDate,
            search
        });
    }

    const columns: ColumnDef<DistributorSale>[] = [
        {
            header: "Product",
            cell: ({ row }) => (
                <div className="min-w-40 flex gap-3 items-center">
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
                <div className="min-w-80">
                    <Chip>{row.original.variant.variant_name}</Chip>
                </div>
            ),
            meta: { align: 'center' }
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
        {
            header: 'Action',
            cell: ({ row })  => (
                <IconButton 
                    icon={<Eye size={20}/>}
                    onClick={() => setDistributorSale(row.original)}
                />
            )
        }
    ];

    return (
        <PageContainer 
            title="Distributor Sales"
            description="View distributor sales including sold items and quantities."
        >
            <DistributorSalesModal 
                close={() => setDistributorSale(null)}
                distributorSale={distributorSale}
            />
            <div className="flex justify-end px-5">
                <Button 
                    label="Export"
                    icon={<Download size={20} />}
                    onClick={downloadDistributorSales}
                />
            </div>
            <Card className="flex flex-col max-h-screen space-y-5 p-0 pt-5">
                <DistributorSalesControls
                    sorting={sorting}
                    setSorting={setSorting}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setSearch={setSearch}
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
                    onRowClick={(row) => setDistributorSale(row)}
                />
            </Card>
        </PageContainer>
    )
}