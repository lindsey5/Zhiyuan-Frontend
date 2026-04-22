import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import { useDebounce } from "../../hooks/useDebounce";
import { useUser } from "../../hooks/useUser";
import type { GetUser } from "../../types/user.type";
import { type ColumnDef, type PaginationState, type Row } from "@tanstack/react-table";
import { formatDate } from "../../utils/utils";
import CustomizedTable from "../../components/ui/Table";
import Chip from "../../components/ui/Chip";
import usePermissions from "../../hooks/usePermissions";
import { PERMISSIONS } from "../../config/permission";
import Button from "../../components/ui/Button";
import UsersTableControls from "../../components/users/UsersTableControls";
import UsersCount from "../../components/users/UsersCount";
import GoldButton from "../../components/ui/GoldButton";
import UserModal from "../../components/users/UserModal";
import { promiseToast } from "../../utils/sileo";
import type { CreateColumnsParams } from "../../types/type";

interface UserColsParams extends CreateColumnsParams{
    handleDelete: (id: string) => void;
    showEdit: (user : GetUser) => void;
}

const getColumns = ({
    hasAnyPermissions,
    hasPermissions,
    handleDelete,
    showEdit
} : UserColsParams) : ColumnDef<GetUser>[] => [
    {
        header: "User",
        cell: ({ row }) => {
            const { firstname, lastname, email } = row.original;

            return (
                <div>
                    <h1 className="font-semibold">{`${firstname} ${lastname}`}</h1>
                    <p>{email}</p>
                </div>
            )
        },
        meta: { align: 'left' }
    },
    {
        header: "Role",
        accessorKey: 'role.name',
        cell: info => (
            <div className="min-w-30">
                <Chip>{info.getValue() as string}</Chip>
            </div>
        ),
        meta: { align: 'center' }
    },
    {
        header: 'Permissions',
        cell: ({ row }) => row.original.role.permissions.length,
        meta: { align: 'center' }
    },
    {
        header: "Created At",
        accessorKey: 'createdAt',
        cell: info => formatDate(info.getValue() as string),
        meta: { align: 'center' },
    },
    ...(hasAnyPermissions([ PERMISSIONS.USER_UPDATE, PERMISSIONS.USER_DELETE])
        ? [
            {
                header: "Action",
                cell: ({ row } : { row: Row<GetUser> }) => (
                    <div className="flex gap-3 md:justify-center">
                        {hasPermissions([PERMISSIONS.USER_UPDATE]) && (
                            <Button
                                label="Edit"
                                className="p-2 lg:p-3 text-xs"
                                onClick={() => showEdit(row.original)}
                            />
                        )}

                        {hasPermissions([PERMISSIONS.USER_DELETE]) && (
                            <Button
                                label="Delete"
                                className="bg-red-600 text-white p-2 lg:p-3 text-xs"
                                onClick={() => handleDelete(row.original._id)}
                            />
                        )}
                    </div>
                ),
                meta: { align: 'center' },
            },
        ]
    : []),
]

export default function Users () {
    const [user, setUser] = useState<GetUser>();
    const [showModal, setShowModal] = useState(false);

    const { hasAnyPermissions, hasPermissions } = usePermissions();

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 800);
    const [role, setRole] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });
    const params = useMemo(() => ({
        search: debouncedSearch,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        role
    }), [debouncedSearch, pagination.pageIndex, pagination.pageSize, role]);

    const debouncedParams = useDebounce(params, 500);

    const { getUsers, deleteUser } = useUser();
    const { data, isFetching } = getUsers(debouncedParams);

    const showEdit = (user : GetUser) => {
        setUser(user);
        setShowModal(true);
    }

    const closeModal = () =>{
        setUser(undefined);
        setShowModal(false);
    }

    const handleShow = () => setShowModal(true);

    const handleDelete = (id : string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;

        promiseToast(deleteUser.mutateAsync({ id }));
    }

    const onRowClick = (row : GetUser) => {
        if(hasPermissions([PERMISSIONS.USER_UPDATE])) showEdit(row);
    }

    const columns = getColumns({
        handleDelete,
        hasAnyPermissions,
        hasPermissions,
        showEdit,
    })

    return (
        <PageContainer 
            title="User Management"
            description="View and manage all users"
        >
            <UsersCount  />
            <div className="w-full justify-end flex md:hidden">
                <GoldButton 
                    className="text-sm p-2"
                    onClick={handleShow}
                >Create User</GoldButton>
            </div>
            <Card className="p-0 flex flex-col max-h-screen space-y-5 pt-5">
                <UsersTableControls 
                    role={role}
                    setRole={setRole}
                    setSearch={setSearch}
                    setPagination={setPagination}
                />
                <CustomizedTable 
                    data={data?.users || []}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    totalPages={data?.totalPages || 0}
                    showPagination
                    isLoading={isFetching}
                    noDataMessage="No Users Found"
                    total={data?.total || 0}
                    onRowClick={onRowClick}
                />
            </Card>
            <UserModal 
                user={user}
                onClose={closeModal}
                open={showModal}
            />
            <div className="w-full justify-end hidden md:flex text-sm">
                <GoldButton onClick={handleShow}>Create User</GoldButton>
            </div>
        </PageContainer>
    )
}