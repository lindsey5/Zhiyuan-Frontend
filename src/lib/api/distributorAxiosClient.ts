import axios from 'axios';
import { authService } from '../../service/authService';
import { useDistributorAuthStore } from '../store/distributorAuthStore';

const API_URL = import.meta.env.VITE_API_URL;

const distributorAxiosClient = axios.create({
    baseURL: `${API_URL}/api/`,
    timeout: 10000,
});

distributorAxiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const { refreshToken, setAuth, logout, setDistributor } = useDistributorAuthStore.getState();

        if (status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true;

            try {
                const data = await authService.distributorRefreshAccessToken(refreshToken);
                
                setAuth(
                    data.token.accessToken,
                    data.token.refreshToken,
                );

                setDistributor(data.distributor)

                originalRequest.headers.Authorization = `Bearer ${data.token.accessToken}`;

                return distributorAxiosClient(originalRequest);
            } catch (err) {
                logout();
                return Promise.reject(err);
            }
        }
        const message = error.response?.data?.message || error.response?.data?.error || error.message;
        return Promise.reject(new Error(message));
    }
);

export default distributorAxiosClient;