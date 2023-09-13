import axios from "axios";

const NodalInstance = axios.create({
    baseURL:'http://localhost:3333/nodal'
})
export default  NodalInstance