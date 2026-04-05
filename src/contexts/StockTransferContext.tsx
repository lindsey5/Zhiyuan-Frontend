import React, { createContext, useEffect, useState, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../lib/store/authStore';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

interface StockTransferSocketContextType {
    socket: Socket | null;
}

const StockTransferSocketContext = createContext<StockTransferSocketContextType>({
    socket: null,
});

interface StockTransferSocketContextProviderProps {
    children: ReactNode;
}

const StockTransferSocketContextProvider: React.FC<StockTransferSocketContextProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { accessToken } = useAuthStore();

    useEffect(() => {
        const connectSocket =() => {
            try {
                const newSocket = io(`${SOCKET_URL}/stock-transfer`, { 
                    auth: { token: `Bearer ${accessToken}`}
                 });

                newSocket.on("connect", () => {
                    console.log("Connected to Socket");
                });

                setSocket(newSocket);
            } catch (error : any) {
                console.error("Error connecting to socket:", error.message);
            }
        };

        connectSocket();

        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    return (
        <StockTransferSocketContext.Provider value={{ socket }}>
        {children}
        </StockTransferSocketContext.Provider>
    );
};

export default StockTransferSocketContextProvider