
import ProtectNodal from "../components/nodal-point/ProtectedRoute"
// import { Home } from "../pages/channel-partner/Home"
import CreateCP from "../pages/nodal-point/CreateCP"
import Login from "../pages/nodal-point/Login"
import { Routes, Route, Navigate  } from "react-router-dom"
import NodalHome from "../pages/nodal-point/NodalHome"
import AcceptFdm from "../pages/nodal-point/AcceptFdm"
// import PincodeSearch from "../pages/nodal-point/PincodeSearch"

const NodalRoutes = () => {
    return (
        <>
            {/* <Header /> */}
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={<Navigate to='/nodal/login'/>} />
                <Route element={<ProtectNodal />} >
                    <Route path="/create-cp" element={<CreateCP />} />
                    <Route path="/home" element={<NodalHome />} />
                    <Route path="/accept-fdm" element={<AcceptFdm />} />
                    {/* <Route path="/pincode-search" element={<PincodeSearch />} /> */}
                </Route>
            </Routes>
        </>
    )
}
export default NodalRoutes 
