import { useUser } from "../../hooks/useUser"
import Card from "../ui/Card";

export default function UsersCount () {
    const { getUsersCount } = useUser();
    const { data } = getUsersCount();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
            {data?.usersCount.map((count) => (
                <Card key={count.role_name} className="space-y-2">
                    <h1 className="text-md lg:text-lg font-semibold">{count.role_name}</h1>
                    <p className="text-gold font-bold">{count.total}</p>
                </Card>
            ))}
        </div>
    )
}