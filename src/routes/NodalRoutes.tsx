import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import ProtectNodal from "../components/nodal-point/ProtectedRoute"
import Login from "../pages/nodal-point/Login"
import NodalHome from "../pages/nodal-point/NodalHome"

const CreateCP = lazy(() => import("../pages/nodal-point/CreateCP"))
const PincodeSearch = lazy(() => import("../pages/nodal-point/PincodeSearch"))
const ReturnRecieved = lazy(() => import("../pages/nodal-point/ReturnRecieved"))
const ReturnSending = lazy(() => import("../pages/nodal-point/ReturnManagement"))
const SendFdms = lazy(() => import("../pages/nodal-point/SendFdm"))
const RecievingFdm = lazy(() => import("../pages/nodal-point/RecievingFdm"))
const ConsignmentTracking = lazy(() => import("../pages/nodal-point/ConsignmentTracking"))
const AcceptFdm = lazy(() => import("../pages/nodal-point/AcceptFdm"))



const NodalRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Navigate to='/nodal/login' />} />
                <Route element={<ProtectNodal />} >

                    <Route path="/home" element={<NodalHome />} />


                    <Route path="/create-cp" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <CreateCP />
                        </Suspense>
                    } />

                    <Route path="/accept-fdm" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <AcceptFdm />
                        </Suspense>
                    } />

                    <Route path="/tracking" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <ConsignmentTracking />
                        </Suspense>
                    } />

                    <Route path="/recieved-fdms" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <RecievingFdm />
                        </Suspense>
                    } />

                    <Route path="/send-fdms" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <SendFdms />
                        </Suspense>
                    } />

                    <Route path="/return-sending" element={
                        <Suspense fallback = {<div>Loading</div>}>
                            <ReturnSending />
                        </Suspense>
                    } />

                    <Route path="/return-recieved" element={
                        <Suspense fallback = {<div>Loading</div>}>
                            <ReturnRecieved />
                        </Suspense>
                    } />

                    <Route path="/pincode-search" element={
                        <Suspense fallback = {<div>Loading</div>}>
                            <PincodeSearch />
                        </Suspense>
                    } />


                </Route>
            </Routes>
        </>
    )
}
export default NodalRoutes 
