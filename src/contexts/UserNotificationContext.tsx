import { useSocket } from '../hooks/useSocket';
import { createContext, useEffect, useState, type SetStateAction } from 'react';
import type { SocketContextProviderProps, SocketContextType } from './context.type';
import { useUserNotification } from '../hooks/useUserNotification';
import type { UserNotification } from '../types/userNotification.type';

interface NotificationContextType extends SocketContextType {
    setPage: React.Dispatch<SetStateAction<number>> | null;
    notifications: UserNotification[];
    unread: number;
    totalPages: number;
    isFetching: boolean;
    page: number;
}

export const UserNotificationSocketContext = createContext<NotificationContextType>({
    socket: null,
    setPage: null,
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
    const { getUserNotifications } = useUserNotification();
    const [page, setPage] = useState(1);
    const { data, isFetching } = getUserNotifications({ page, limit: 1 });

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
            }}
        >
        {children}
        </UserNotificationSocketContext.Provider>
    );
};

export default UserNotificationSocketContextProvider