import { Navigate,Outlet } from "react-router-dom"
const ProtectCp = () => {
    return(localStorage.getItem('cpToken')? <Outlet /> : <Navigate to="/cp/login" replace/> )
}
export default ProtectCp