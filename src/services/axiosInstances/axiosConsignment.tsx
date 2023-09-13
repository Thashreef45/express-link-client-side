import axios from "axios";

const consignmentInstance = axios.create({
    baseURL:'http://localhost:3000/consignment'
})
export default  consignmentInstance