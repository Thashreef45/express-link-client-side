import CreateNodal from "../pages/apex/CreateNodal"
import Login from "../pages/apex/Login"
import { Routes, Route } from "react-router-dom"

const ApexRoute = () => {
    return (
        <>
            {/* <Header /> */}
            <Routes>
                {/* <Route path="/" element={<ProtectApex />}> */}
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/home" element={<Home/>} /> */}
                    <Route path="/create-nodal" element={<CreateNodal />} />
                {/* </Route> */}

            </Routes>
        </>
    )
}
export default ApexRoute