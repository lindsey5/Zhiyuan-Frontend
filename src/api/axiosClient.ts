import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api/',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.response?.data?.error || error.message;
        return Promise.reject(new Error(message));
    }
);

export default axiosClient;