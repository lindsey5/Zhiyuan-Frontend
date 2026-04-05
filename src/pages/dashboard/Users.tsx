import { useState } from "react";
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
import { useRole } from "../../hooks/useRole";
import Button from "../../components/ui/Button";
import UsersTableControls from "../../components/users/UsersTableControls";
import UsersCount from "../../components/users/UsersCount";
import GoldButton from "../../components/ui/GoldButton";
import UserModal from "../../components/users/UserModal";
import { promiseToast } from "../../utils/sileo";

export default function Users () {
    const [user, setUser] = useState<GetUser>();
    const [showModal, setShowModal] = useState(false);

    const { hasAnyPermissions, hasPermissions } = usePermissions();
    const { getOwnRole } = useRole();
    const { data : roleData } = getOwnRole();
    const permissions = roleData?.permissions || [];

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [role, setRole] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({ pageSize: 50, pageIndex: 0 });

    const { getUsers, deleteUser } = useUser();
    const { data, isFetching } = getUsers(
        {
            search: debouncedSearch,
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
            role
        }
    );

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

    const columns: ColumnDef<GetUser>[] = [
        {
            header: "User",
            cell: ({ row }) => {
                const { firstname, lastname, email } = row.original;

                return (
                    <div className="">
                        <h1 className="font-semibold">{`${firstname} ${lastname}`}</h1>
                        <p>{email}</p>
                    </div>
                )
            },
            meta: { align: 'center' }
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
        ...(hasAnyPermissions([ PERMISSIONS.USER_UPDATE, PERMISSIONS.USER_DELETE], permissions)
            ? [
                {
                    header: "Action",
                    cell: ({ row } : { row: Row<GetUser> }) => (
                        <div className="flex gap-3 md:justify-center">
                            {hasPermissions([PERMISSIONS.USER_UPDATE], permissions) && (
                                <Button
                                    label="Edit"
                                    className="p-2 lg:p-3 text-xs md:text-sm"
                                    onClick={() => showEdit(row.original)}
                                />
                            )}
    
                            {hasPermissions([PERMISSIONS.USER_DELETE], permissions) && (
                                <Button
                                    label="Delete"
                                    className="bg-red-600 text-white p-2 lg:p-3 text-xs md:text-sm"
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
            <Card className="p-0 flex flex-col space-y-5 pt-5">
                <UsersTableControls 
                    role={role}
                    setRole={setRole}
                    setSearch={setSearch}
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
                />
            </Card>
            <UserModal 
                user={user}
                onClose={closeModal}
                open={showModal}
            />
            <div className="w-full justify-end hidden md:flex">
                <GoldButton onClick={handleShow}>Create User</GoldButton>
            </div>
        </PageContainer>
    )
}