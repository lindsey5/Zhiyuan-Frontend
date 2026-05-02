import type { ColumnDef } from "@tanstack/react-table";
import { useDistributor } from "../../hooks/useDistributor";
import type { Distributor } from "../../types/distributor.type";
import Card from "../ui/Card";
import CustomizedTable from "../ui/Table";
import { useNavigate } from "react-router-dom";
import { formatDate, formatToPeso } from "../../utils/utils";

const getColumns = () : ColumnDef<Distributor>[] => [
    {
        header: "ID",
        accessorKey: "distributor_id"
    },
    {
        header: "Name",
        accessorKey: "distributor_name",
        meta: { align: 'center '}
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
        header: "Commission from Downline Distributor",
        accessorKey: 'child_commission_rate',
        cell: info => `${info.getValue()}%`,
        meta: { align: 'center '}
    },
    {
        header: "Parent Distributor",
        accessorKey: 'parent_distributor',
        cell: info => info.getValue() ? (info.getValue() as Distributor)?.distributor_name : "N/A",
        meta: { align: 'center '}
    },
    {
        header: "Wallet Balance",
        accessorKey: "wallet_balance",
        cell: info => formatToPeso(info.getValue() as number),
        meta: { align: 'center '}
    },
]

export default function DownlineDistributors ({ distributorId } : { distributorId: string}) {
    const navigate = useNavigate();
    const { getDownlineDistributors } = useDistributor();
    const { data, isFetching } = getDownlineDistributors(distributorId);

    return (
        <Card className="p-0 max-h-screen flex flex-col gap-3 pt-5">
            <h1 className="px-5 font-bold text-lg">Downline Distributors</h1>
            <CustomizedTable 
                isLoading={isFetching}
                data={data?.downlineDistributors || []}
                columns={getColumns()}
                showPagination={false}
                noDataMessage="No Downline Distributors"
                onRowClick={(row) => navigate(`/dashboard/distributors/${row._id}`)}
            />
        </Card>
    )
}