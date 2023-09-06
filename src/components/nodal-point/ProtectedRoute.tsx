import { Navigate,Outlet } from "react-router-dom"
const ProtectNodal = () => {
    return(localStorage.getItem('nodalToken')? <Outlet /> : <Navigate to="/nodal/login" replace/> )
}
export default ProtectNodal