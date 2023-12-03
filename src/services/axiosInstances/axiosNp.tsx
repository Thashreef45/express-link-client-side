import axios from "axios";

const link = import.meta.env.VITE_GATEWAY_NODAL

const NodalInstance = axios.create({
    baseURL:link
})

NodalInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('nodalToken');
        if (token) {
            config.headers['token'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


NodalInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default  NodalInstance