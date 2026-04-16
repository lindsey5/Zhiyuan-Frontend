import { useEffect, useState, type SetStateAction } from "react";
import Card from "../ui/Card";
import CustomizedTable from "../ui/Table";
import { useDebounce } from "../../hooks/useDebounce";
import type { Distributor } from "../../types/distributor.type";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useDistributor } from "../../hooks/useDistributor";
import GoldButton from "../ui/GoldButton";
import { User } from "lucide-react";
import DistributorsControls from "../distributors/DistributorsControls";

interface DistributorSelectorProps {
    setDistributor: React.Dispatch<SetStateAction<string | null>>;
    defaultDistributor: string | null;
}

export default function DistributorSelector({ setDistributor, defaultDistributor } : DistributorSelectorProps) {
    const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const { getDistributors } = useDistributor();
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 50,
        pageIndex: 0,
    });

    const { data, isFetching } = getDistributors({
        search: debouncedSearch,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy,
        order,
        id: defaultDistributor || undefined
    });

    const columns: ColumnDef<Distributor>[] = [
        {
            header: "ID",
            accessorKey: "distributor_id",
        },
        {
            header: "Name",
            accessorKey: "distributor_name",
            meta: { align: "center" },
        },
        {
            header: "Email",
            accessorKey: "email",
            meta: { align: "center" },
        },
        {
            header: "Commission Rate",
            accessorKey: "commission_rate",
            cell: (info) => `${info.getValue()}%`,
            meta: { align: "center" },
        },
        {
            header: "Recruit by",
            accessorKey: "parent_distributor",
            cell: (info) =>
                info.getValue()
                ? (info.getValue() as Distributor)?.distributor_name
                : "N/A",
            meta: { align: "center" },
        },
        {
            header: "Total Stocks",
            accessorKey: "total_stocks",
            meta: { align: "center" },
        },
        {
            header: "Action",
            cell: ({ row }) => (
                <div className="flex md:justify-center">
                    <GoldButton 
                        className="p-2"
                        onClick={() => { setSelectedDistributor(row.original); setDistributor(row.original._id)}}>
                    Select
                    </GoldButton>
                </div>
            ),
            meta: { align: "center" },
        },
    ];

    useEffect(() => {
        if(defaultDistributor) setSelectedDistributor(data?.distributors[0] || null);
    }, [data])

    return (
        <Card className="p-0 flex flex-col">
            {/* If selected distributor exists show info */}
            {selectedDistributor ? (
                <div className="p-3 xl:p-6 space-y-3 xl:space-y-5 mt-3">
                <h1 className="text-md xl:text-lg font-bold">Selected Distributor</h1>

                <div className="flex items-center gap-4 p-2 xl:p-4 border border-[var(--border-ui)] rounded-lg">
                    <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-gold flex items-center justify-center">
                    <User className="text-inverse w-7 h-7" />
                    </div>

                    <div className="flex flex-col break-all">
                        <span className="font-bold text-sm xl:text-md">
                            {selectedDistributor.distributor_name}
                        </span>
                        <span className="text-xs xl:text-md text-muted">{selectedDistributor.email}</span>
                        <span className="text-xs xl:text-md text-muted">
                            Commission Rate: {selectedDistributor.commission_rate}%
                        </span>
                    </div>
                </div>

                {!defaultDistributor && <GoldButton 
                    onClick={() => {
                        setSelectedDistributor(null)
                        setDistributor(null)
                    }}
                    className="text-xs xl:text-sm"
                >
                Change Distributor
                </GoldButton>}
                </div>
            ) : (
                <>
                {/* Search */}
                <h1 className="p-5 text-md xl:text-lg font-bold">Select Distributor</h1>
                <DistributorsControls 
                    order={order}
                    setOrder={setOrder}
                    setSearch={setSearch}
                    setSort={setSortBy}
                    sort={sortBy}
                    setPagination={setPagination}
                />

                {/* Table */}
                <CustomizedTable
                    isLoading={isFetching}
                    data={data?.distributors || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    noDataMessage="No Distributors Found"
                    total={data?.total || 0}
                    className="max-h-[70vh]"
                />
                </>
            )}
        </Card>
    );
}