import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import Card from "../ui/Card";
import type { VariantWithProduct } from "../../types/variant.type";
import { formatDate, formatToPeso } from "../../utils/utils";
import { useVariant } from "../../hooks/useVariant";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchField } from "../ui/TextField";
import CustomizedTable from "../ui/Table";
import GoldButton from "../ui/GoldButton";

interface VariantSelectorProps {
    addVariant: (variant: VariantWithProduct, quantity: number) => void;
}

export default function VariantSelector ({ addVariant } : VariantSelectorProps) {
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);

    const params = { 
        page: pagination.pageIndex + 1, 
        limit: pagination.pageSize,
        search: debouncedSearch,
    }

    const { getVariants } = useVariant();
    const { data, isFetching } = getVariants(params);

    const columns: ColumnDef<VariantWithProduct>[] = [
        {
            header: "Variant",
            cell: ({ row }) => (
                <div className="md:min-w-50 md:m-3 flex items-center gap-3 justify-start">
                    <img className="w-10 :h-10 rounded-md object-cover" src={row.original.image_url} />
                    <span className="text-xs md:text-sm">{row.original.variant_name}</span>
                </div>
            ),
            meta: { align: 'left' },
        },
        {
            header: 'SKU',
            accessorKey: 'sku',
            meta: { align: 'center' },
        },
        {
            header: 'Product name',
            accessorKey: 'product.product_name',
            meta: { align: 'center' },
        },
        {
            header: "Category",
            accessorKey: "product.category",
            
            cell: info => <span className="text-xs lg:text-sm">{info.getValue() as string}</span>,
            meta: { align: 'center' },
        },
        {
            header: "Stock",
            accessorKey: "stock",
            meta: { align: 'center' },
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: info => formatToPeso(info.getValue() as number),
            meta: { align: 'center' },
        },
        {
            header: "Created At",
            accessorKey: 'createdAt',
            cell: info => formatDate(info.getValue() as string),
            meta: { align: 'center' },
        },
        {
            header: 'Action',
            cell: ({ row }) => (
                <GoldButton
                    className="text-xs md:text-sm"
                    onClick={() => addVariant(row.original, 1)}
                >Add</GoldButton>
            )
        }
    ]

    return (
        <Card className="p-0 flex flex-col">
            <div className="max-w-80 mt-5 mx-5 space-y-2 mb-5">
                <h1 className="text-lg font-bold">Select Variants</h1>
                <SearchField
                    placeholder="Search variants"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <CustomizedTable
                isLoading={isFetching}
                data={data?.variants || []}
                columns={columns}
                pagination={pagination}
                setPagination={setPagination}
                totalPages={data?.totalPages || 0}
                showPagination
                noDataMessage="No Variants Found"
                total={data?.total || 0}
                className="max-h-[70vh]"
            />
        </Card>
    )
}