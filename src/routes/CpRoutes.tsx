import { Home } from "../pages/channel-partner/Home"
import Header from "../components/channel-partner/Header"
import Login from "../pages/channel-partner/Login"
import { Routes, Route } from "react-router-dom"
import ProtectCp from '../components/channel-partner/ProtectedRoute'
const CpRoutes = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="" element={<ProtectCp />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </>
    )
}
export default CpRoutes