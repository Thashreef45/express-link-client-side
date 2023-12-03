import axios from "axios";

const link = import.meta.env.VITE_GATEWAY_APEX

const ApextInstance = axios.create({
    baseURL:link
})


ApextInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('apexToken');
        if (token) {
            config.headers['token'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


ApextInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default  ApextInstance