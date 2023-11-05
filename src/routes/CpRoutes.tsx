import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/channel-partner/Login"
import ProtectCp from '../components/channel-partner/ProtectedRoute'
import NewBooking from "../pages/channel-partner/NewBooking"
import EmployeeManagement from "../pages/channel-partner/EmplyeeManagement"

const TrackingPage = lazy(() => import("../pages/channel-partner/TrackingPage")) 
const BookingHistory = lazy((() => import("../pages/channel-partner/BookingHistory")))
const MyBookings = lazy(() => import("../pages/channel-partner/MyBookings"))
const Home = lazy(() => import("../pages/channel-partner/Home"))
const DeliveryManagement = lazy(() => import("../pages/channel-partner/DeliveryManagement"))
const FdmAssignedEmployees = lazy(() => import("../pages/channel-partner/FdmAssignedEmployees"))
const AssignedFdms = lazy(() => import("../pages/channel-partner/AssignedFdms"))
const PurchaseAwb = lazy(() => import("../pages/channel-partner/PurchaseAwb"))
const PincodeSearch = lazy(() => import("../pages/channel-partner/PincodeSearch"))

const CpRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="" element={<Navigate to="/cp/login" />} />
                <Route element={<ProtectCp />}>

                    <Route path="/new-booking" element={<NewBooking />} />
                    
                    <Route path="/employee-management" element={<EmployeeManagement />} />

                    <Route path="/tracking" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <TrackingPage />
                        </Suspense>
                    } />

                    <Route path="/booking-history" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <BookingHistory />
                        </Suspense>
                    } />

                    <Route path="/my-bookings" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <MyBookings />
                        </Suspense>
                    } />

                    <Route path="/home" element={
                        <Suspense fallback={<div>Loading Home Page</div>}>
                            <Home />
                        </Suspense>
                    } />

                    <Route path="/delivery-management" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <DeliveryManagement />
                        </Suspense>
                    } />

                    <Route path="/assigned-fdms/:id" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <AssignedFdms />
                        </Suspense>
                    } />

                    <Route path="/pincode-search" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <PincodeSearch />
                        </Suspense>}
                    />

                    <Route path="/purchase-awb" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <PurchaseAwb />
                        </Suspense>}
                    />

                    <Route path="/fdm-assigned-employees" element={
                        <Suspense fallback={<div>Loading</div>}>
                            <FdmAssignedEmployees />
                        </Suspense>}
                    />

                </Route>
            </Routes>
        </>
    )
}
export default CpRoutes