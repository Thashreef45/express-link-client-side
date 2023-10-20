import { Home } from "../pages/channel-partner/Home"
import Login from "../pages/channel-partner/Login"
import { Routes, Route, Navigate } from "react-router-dom"
import ProtectCp from '../components/channel-partner/ProtectedRoute'
import PincodeSearch from "../pages/channel-partner/PincodeSearch"
import PurchaseAwb from "../pages/channel-partner/PurchaseAwb"
import NewBooking from "../pages/channel-partner/NewBooking"
import EmployeeManagement from "../pages/channel-partner/EmplyeeManagement"
import MyBookings from "../pages/channel-partner/MyBookings"
import BookingHistory from "../pages/channel-partner/BookingHistory"
import TrackingPage from "../pages/channel-partner/TrackingPage"
import DeliveryManagement from "../pages/channel-partner/DeliveryManagement"
import RecievedFdms from "../pages/channel-partner/RecievedFdms"
// import BuyAwb from "../pages/channel-partner/BuyAwb"
const CpRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="" element={<Navigate to="/cp/login" />} />
                <Route element={<ProtectCp />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/pincode-search" element={<PincodeSearch />} />
                    <Route path="/pincode-search" element={<PincodeSearch />} />
                    <Route path="/new-booking" element={<NewBooking />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route path="/recieved-fdms" element={<RecievedFdms />} />
                    <Route path="/delivery-management" element={<DeliveryManagement />} />
                    <Route path="/booking-history" element={<BookingHistory />} />
                    <Route path="/tracking" element={<TrackingPage />} />
                    <Route path="/purchase-awb" element={<PurchaseAwb />} />
                    <Route path="/employee-management" element={<EmployeeManagement />} />

                </Route>
            </Routes>
        </>
    )
}
export default CpRoutes