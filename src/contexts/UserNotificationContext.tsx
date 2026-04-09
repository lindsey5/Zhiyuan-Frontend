import { useSocket } from '../hooks/useSocket';
import { createContext, useEffect, useState, type SetStateAction } from 'react';
import type { SocketContextProviderProps, SocketContextType } from './context.type';
import { useUserNotification } from '../hooks/useUserNotification';
import type { UserNotification } from '../types/userNotification.type';

interface NotificationContextType extends SocketContextType {
    setPage?: React.Dispatch<SetStateAction<number>> | null;
    notifications: UserNotification[];
    unread: number;
    totalPages: number;
    isFetching: boolean;
    page: number;
    readNotification?: (id: string) => Promise<void>;
}

export const UserNotificationSocketContext = createContext<NotificationContextType>({
    socket: null,
    notifications: [],
    unread: 0,
    totalPages: 1,
    isFetching: false,
    page: 1,
});

const UserNotificationSocketContextProvider  = ({ children } : SocketContextProviderProps) => {
    const socket = useSocket({
        namespace: "/notification",
        events: {}
    })
    const [notifications, setNotifications] = useState<UserNotification[]>([]);
    const [unread, setUnread] = useState(0);
    const { getUserNotifications, readNotification } = useUserNotification();
    const [page, setPage] = useState(1);
    const { data, isFetching } = getUserNotifications({ page, limit: 10 });

    useEffect(() => {
        if(data?.userNotifications){
            setUnread(data.unread);
            setNotifications(prev => 
                page === 1 ? data.userNotifications : [...prev, ...data.userNotifications]
            )
        }

        if(socket){
            socket.on("receive-notification", (data) => {
                setNotifications(prev => [data.userNotification, ...prev]);
                setUnread(prev => prev + 1);
            })
        }

        return () => {
            if(socket) socket.off('receive-notification');
        }
    }, [socket, data])

    const handleReadNotification = async (id: string) => {
        const response = await readNotification.mutateAsync({ id });

        if(response.success){
            setNotifications(prev => prev.map(notification => notification._id === id ? { ...notification, status: "read"} : notification))
            setUnread(prev => prev - 1);
        }
    }

    return (
        <UserNotificationSocketContext.Provider 
            value={{ 
                socket, 
                setPage, 
                unread, 
                notifications, 
                isFetching, 
                page, 
                totalPages: data?.totalPages || 0,  
                readNotification: handleReadNotification
            }}
        >
        {children}
        </UserNotificationSocketContext.Provider>
    );
};

export default UserNotificationSocketContextProvider