import axios from "axios";

const ApextInstance = axios.create({
    baseURL:'http://localhost:3333/apex'
})
export default  ApextInstance