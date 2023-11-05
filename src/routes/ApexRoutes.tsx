import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import ProtectApex from "../components/apex/ProtectedRoute"
import Login from "../pages/apex/Login"
import ApexHome from "../pages/apex/ApexHome"

const OutGoings = lazy(() => import("../pages/apex/OutGoings"))
const CreateNodal = lazy(() => import("../pages/apex/CreateNodal"))
const Incomings = lazy(() => import("../pages/apex/Incomings"))
const PincodeSearch = lazy(() => import("../pages/apex/PicodeSearch"))
const TrackingPage = lazy(() => import("../pages/apex/ConsignmentTracking"))


const ApexRoute = () => {
    return (
        <>
            <Routes>

                <Route path="" element={<Navigate to="/apex/login" />} />
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<ProtectApex />} >
                    <Route path="/home" element={<ApexHome />} />


                    <Route path="/create-nodal" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <CreateNodal />
                        </Suspense>
                    } />


                    <Route path="/out-goings" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <OutGoings />
                        </Suspense>
                    } />

                    <Route path="/incomings" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <Incomings />
                        </Suspense>
                    } />

                    <Route path="/pincode-search" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <PincodeSearch />
                        </Suspense>
                    } />

                    <Route path="/tracking" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <TrackingPage />
                        </Suspense>
                    } />

                </Route>

            </Routes>
        </>
    )
}
export default ApexRoute