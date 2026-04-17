import { useSocket } from './useSocket';
import { useEffect, useState } from 'react';
import { useUserNotification } from './useUserNotification';
import type { UserNotification } from '../types/userNotification.type';

const useNotifications  = () => {
    const socket = useSocket({
        namespace: "/notification",
        events: {}
    })
    const orderSocket = useSocket({ namespace: '/orders' })
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
                console.log(data)
                setNotifications(prev => [data.userNotification, ...prev]);
                setUnread(prev => prev + 1);
            })
        }

        if(orderSocket){
            orderSocket.on("receive-notification", (data) => {
                console.log(data)
                setNotifications(prev => [data.userNotification, ...prev]);
                setUnread(prev => prev + 1);
            })
        }

        return () => {
            if(socket) socket.off('receive-notification');
            if(orderSocket) orderSocket.off('receive-notification');
        }
    }, [socket, orderSocket, data])

    const handleReadNotification = async (id: string) => {
        const response = await readNotification.mutateAsync({ id });

        if(response.success){
            setNotifications(prev => prev.map(notification => notification._id === id ? { ...notification, status: "read"} : notification))
            setUnread(prev => prev - 1);
        }
    }

    return { 
        socket, 
        setPage, 
        unread, 
        notifications, 
        isFetching, 
        page, 
        totalPages: data?.totalPages || 0,  
        readNotification: handleReadNotification
    }
};

export default useNotifications