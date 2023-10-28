import ApexHome from "../pages/apex/ApexHome"
import CreateNodal from "../pages/apex/CreateNodal"
import Login from "../pages/apex/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import OutGoings from "../pages/apex/OutGoings"
import Incomings from "../pages/apex/Incomings"
import PincodeSearch from "../pages/apex/PicodeSearch"
import TrackingPage from "../pages/apex/ConsignmentTracking"

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
                <Route path="/pincode-search" element={<PincodeSearch />} />
                <Route path="/tracking" element={<TrackingPage />} />

                

                {/* </Route> */}

            </Routes>
        </>
    )
}
export default ApexRoute