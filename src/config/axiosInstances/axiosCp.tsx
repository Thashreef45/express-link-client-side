import axios from "axios";

const CpInstance = axios.create({
    baseURL:'http://localhost:3333/cp'
})
export default  CpInstance