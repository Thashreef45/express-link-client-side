import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import ProtectApex from "../components/apex/ProtectedRoute"
import Login from "../pages/apex/Login"
import ApexHome from "../pages/apex/ApexHome"
import FallBack from "../components/FallBack"
import NotFound from "../components/NotFound"

const AccountPage = lazy(() => import("../components/AccountPage"))
const ReturnSending = lazy(() => import("../pages/apex/ReturnManagement"))
const ReturnRecieved = lazy(() => import("../pages/apex/ReturnRecieved"))
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

                    <Route path="/account" element={
                        <Suspense fallback={<FallBack />}>
                            <AccountPage role='apex' />
                        </Suspense>
                    } />

                    <Route path="/create-nodal" element={
                        <Suspense fallback={<FallBack />}>
                            <CreateNodal />
                        </Suspense>
                    } />


                    <Route path="/out-goings" element={
                        <Suspense fallback={<FallBack />}>
                            <OutGoings />
                        </Suspense>
                    } />

                    <Route path="/incomings" element={
                        <Suspense fallback={<FallBack />}>
                            <Incomings />
                        </Suspense>
                    } />

                    <Route path="/pincode-search" element={
                        <Suspense fallback={<FallBack />}>
                            <PincodeSearch />
                        </Suspense>
                    } />

                    <Route path="/tracking" element={
                        <Suspense fallback={<FallBack />}>
                            <TrackingPage />
                        </Suspense>
                    } />

                    <Route path="/return-sending" element={
                        <Suspense fallback={<FallBack />}>
                            <ReturnSending />
                        </Suspense>
                    } />

                    <Route path="/return-recieved" element={
                        <Suspense fallback={<FallBack />}>
                            <ReturnRecieved />
                        </Suspense>
                    } />


                </Route>

                <Route path="*" element={<NotFound role={'apex'}/>} />
            </Routes>
        </>
    )
}
export default ApexRoute