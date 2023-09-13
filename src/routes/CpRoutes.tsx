import { Home } from "../pages/channel-partner/Home"
import Login from "../pages/channel-partner/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import ProtectCp from '../components/channel-partner/ProtectedRoute'
import PincodeSearch from "../pages/channel-partner/PincodeSearch"
import PurchaseAwb from "../pages/channel-partner/PurchaseAwb"
const CpRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="" element={<Navigate to="/cp/login" />} />
                <Route  element={<ProtectCp />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/pincode-search" element={<PincodeSearch />} />
                    <Route path="/purchase-awb" element={<PurchaseAwb />} />
                </Route>
            </Routes>
        </>
    )
}
export default CpRoutes