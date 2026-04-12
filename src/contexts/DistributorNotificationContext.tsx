import React, { createContext } from 'react';

import { useSocket } from '../hooks/useSocket';
import type { SocketContextProviderProps, SocketContextType } from './context.type';

const DistributorNotificationSocketContext = createContext<SocketContextType>({
    socket: null,
});

const DistributorNotificationSocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
    const socket = useSocket({
        namespace: '/distributor-notification'
    })

    return (
        <DistributorNotificationSocketContext.Provider value={{ socket }}>
        {children}
        </DistributorNotificationSocketContext.Provider>
    );
};

export default DistributorNotificationSocketContextProvider