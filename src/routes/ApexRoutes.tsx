import ApexHome from "../pages/apex/ApexHome"
import CreateNodal from "../pages/apex/CreateNodal"
import Login from "../pages/apex/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import OutGoings from "../pages/apex/OutGoings"
import Incomings from "../pages/apex/Incomings"

const ApexRoute = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<Navigate to="/apex/login" />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/" element={<ProtectApex />}> */}
                <Route path="/home" element={<ApexHome/>} />
                <Route path="/create-nodal" element={<CreateNodal />} />
                <Route path="/out-goings" element={<OutGoings />} />
                <Route path="/incomings" element={<Incomings />} />

                {/* </Route> */}

            </Routes>
        </>
    )
}
export default ApexRoute