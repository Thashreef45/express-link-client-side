import axios from "axios";

const ApextInstance = axios.create({
    baseURL:'http://localhost:3333/apex'
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