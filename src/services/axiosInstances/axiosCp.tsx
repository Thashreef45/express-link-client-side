import axios from "axios";

const CpInstance = axios.create({
    baseURL: 'http://localhost:3333/cp',
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



