import React, { createContext } from 'react';

import { useSocket } from '../hooks/useSocket';
import type { SocketContextProviderProps, SocketContextType } from './context.type';

const StockTransferSocketContext = createContext<SocketContextType>({
    socket: null,
});

const StockTransferSocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
    const socket = useSocket({
        namespace: '/stock-transfer'
    })

    return (
        <StockTransferSocketContext.Provider value={{ socket }}>
        {children}
        </StockTransferSocketContext.Provider>
    );
};

export default StockTransferSocketContextProvider