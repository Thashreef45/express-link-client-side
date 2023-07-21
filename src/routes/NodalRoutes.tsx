
import CreateCP from "../pages/nodal-point/CreateCP"
import Login from "../pages/nodal-point/Login"
import { Routes, Route } from "react-router-dom"

const NodalRoutes = () => {
    return (
    <>
        {/* <Header /> */}
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/creat-cp" element={<CreateCP />} />
            {/* <Route path="/home" element={<Home/>} /> */}
        </Routes>
    </>
    )
}
export default NodalRoutes