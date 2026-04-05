import { type ColumnDef, type PaginationState, type Row } from "@tanstack/react-table";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import CustomizedTable from "../../components/ui/Table";
import { formatDate, formatToPeso } from "../../utils/utils";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useDistributor } from "../../hooks/useDistributor";
import type { Distributor } from "../../types/distributor.type";
import GoldButton from "../../components/ui/GoldButton";
import DistributorModal from "../../components/distributors/DistributorModal";
import { Eye, Trash } from "lucide-react";
import { promiseToast } from "../../utils/sileo";
import usePermissions from "../../hooks/usePermissions";
import { useRole } from "../../hooks/useRole";
import { PERMISSIONS } from "../../config/permission";
import DistributorControls from "../../components/distributors/DistributorControls";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";

export default function Distributors () {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const { hasAnyPermissions, hasPermissions } = usePermissions();
    const { getOwnRole } = useRole();
    const permissions = getOwnRole().data?.permissions || [];

    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const { getDistributors, deleteDistributor } = useDistributor();

    const { data, isFetching } = getDistributors({
        search: debouncedSearch,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        sortBy: sortBy,
        order: order
    });

    const handleDelete = (id : string) => {
        const isConfirmed = confirm('Are you sure you want to delete this distributor?');

        if(!isConfirmed) return;

        promiseToast(deleteDistributor.mutateAsync({ id }));
    } 

    const columns: ColumnDef<Distributor>[] = [
        {
            header: "Name",
            accessorKey: "distributor_name",
            meta: { align: 'left '}
        },
        {
            header: "Email",
            accessorKey: "email",
            meta: { align: 'center '}
        },
        {
            header: "Commission Rate",
            accessorKey: 'commission_rate',
            cell: info => `${info.getValue()}%`,
            meta: { align: 'center '}
        },
        {
            header: "Recruit by",
            accessorKey: 'parent_distributor',
            cell: info => info.getValue() ? (info.getValue() as Distributor).parent_distributor.distributor_name : "N/A",
            meta: { align: 'center '}
        },
        {
            header: "Wallet Balance",
            accessorKey: "wallet_balance",
            cell: info => formatToPeso(info.getValue() as number),
            meta: { align: 'center '}
        },
        {
            header: "Total Stocks",
            accessorKey: "total_stocks",
            meta: { align: 'center '}
        },
        {
            header: "Date Created",
            accessorKey: "createdAt",
            cell: info => formatDate(info.getValue() as string),
            meta: { align: 'center '}
        },
         ...(hasAnyPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_READ, PERMISSIONS.DISTRIBUTOR_DELETE], permissions)
            ? [
            {
                header: 'Actions',
                cell: ({ row } : { row : Row<Distributor>}) => (
                    <div className="flex gap-2">
                        {hasPermissions([PERMISSIONS.DISTRIBUTOR_STOCK_READ], permissions) && (
                            <IconButton 
                                onClick={() => navigate(`${row.original._id}`)}
                                icon={<Eye className="text-gold" size={20} />}
                            />
                        )}
                        {hasPermissions([PERMISSIONS.DISTRIBUTOR_DELETE], permissions) && (
                            <IconButton 
                                icon={<Trash color='red' size={20} />}
                                 onClick={() => handleDelete(row.original._id)}
                            />
                        )}
                    </div>
                )
        }
        ]
        : [])
    ]

    return (
        <PageContainer 
            className="md:max-h-screen" 
            title="Distributor Management"
            description="View and manage distributors"
        >
            <Card className="p-0 flex flex-col flex-1 min-h-0 pt-10">
                <DistributorControls 
                    setSearch={setSearch}
                    sort={sortBy}
                    setSort={setSortBy}
                    order={order}
                    setOrder={setOrder}
                />
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
                />
            </Card>
            <DistributorModal 
                onClose={() => setShowModal(false)}
                open={showModal}
            />
            <div className="flex justify-end">
                <GoldButton
                    className="text-sm"
                    onClick={() => setShowModal(true)}
                >Create Distributor</GoldButton>
            </div>
        </PageContainer>
    )
}