import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/channel-partner/Login"
import ProtectCp from '../components/channel-partner/ProtectedRoute'
import NewBooking from "../pages/channel-partner/NewBooking"
import EmployeeManagement from "../pages/channel-partner/EmplyeeManagement"
import FallBack from '../components/FallBack';
import NotFound from '../components/NotFound';

const AccountPage = lazy(() => import('../components/AccountPage'))
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

                    <Route path="/account" element={
                        <Suspense fallback={<FallBack />}>
                            <AccountPage role='cp' />
                        </Suspense>
                    } />

                    <Route path="/tracking" element={
                        <Suspense fallback={<FallBack />}>
                            <TrackingPage />
                        </Suspense>
                    } />

                    <Route path="/booking-history" element={
                        <Suspense fallback={<FallBack />}>
                            <BookingHistory />
                        </Suspense>
                    } />

                    <Route path="/my-bookings" element={
                        <Suspense fallback={<FallBack />}>
                            <MyBookings />
                        </Suspense>
                    } />

                    <Route path="/home" element={
                        <Suspense fallback={<FallBack />}>
                            <Home />
                        </Suspense>
                    } />

                    <Route path="/delivery-management" element={
                        <Suspense fallback={<FallBack />}>
                            <DeliveryManagement />
                        </Suspense>
                    } />

                    <Route path="/assigned-fdms/:id" element={
                        <Suspense fallback={<FallBack />}>
                            <AssignedFdms />
                        </Suspense>
                    } />

                    <Route path="/pincode-search" element={
                        <Suspense fallback={<FallBack />}>
                            <PincodeSearch />
                        </Suspense>}
                    />

                    <Route path="/purchase-awb" element={
                        <Suspense fallback={<FallBack />}>
                            <PurchaseAwb />
                        </Suspense>}
                    />

                    <Route path="/fdm-assigned-employees" element={
                        <Suspense fallback={<FallBack />}>
                            <FdmAssignedEmployees />
                        </Suspense>}
                    />


                </Route>


                <Route path="*" element={<NotFound role={'cp'}/>} />
            </Routes>
        </>
    )
}
export default CpRoutes