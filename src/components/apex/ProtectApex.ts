import { Navigate, Outlet } from "react-router-dom"

const ProtectApex = () => {
    return(localStorage.getItem('apexToken')? <Outlet/> : <Navigate to= "/apex/login" replace/> )
}
export default ProtectApex




