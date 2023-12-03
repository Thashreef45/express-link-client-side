import axios from "axios";

const link = import.meta.env.VITE_GATEWAY_CP

const CpInstance = axios.create({
    baseURL: link
});

CpInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('cpToken');
        if (token) {
            config.headers['token'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


CpInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default CpInstance;



