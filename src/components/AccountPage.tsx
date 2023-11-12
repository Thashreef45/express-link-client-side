import { Box, Container } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Header from "./Header";
import { Colors, Logo } from "../constants/Colors";

import CpInstance from "../services/axiosInstances/axiosCp";
import NodalInstance from "../services/axiosInstances/axiosNp";
import ApextInstance from "../services/axiosInstances/axiosApex";

const AccountPage = (props: { role: string }) => {

    const navigate = useNavigate()
    const [data, setData] = useState<any | null>(null)

    useEffect(() => {
        let role = CpInstance

        if (props.role == 'cp') role = CpInstance
        else if (props.role == 'nodal') role = NodalInstance
        else role = ApextInstance

        role.get(`/home`).then(res => {
            setData(res.data)
        }).catch(() => {
            if (localStorage.getItem(`${props.role}Token`)) localStorage.removeItem(`${props.role}Token`)
            navigate(`/${props.role}/login`)
        })

    }, [])


    return (
        <>
            <Header role={props.role} />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ textAlign: 'center', color: Colors.SecondaryColor, marginTop: '6%' }}>Account Details</h2>
            </center>

            {data &&
                <Container className='mt-5' sx={{
                    display: 'flex',
                    justifyContent: 'center'

                }}>
                    <Box sx={{
                        backgroundColor: Colors.PrimaryColor,
                        width: '40%',
                        padding: 4,
                        border: 1,
                        borderRadius: 5
                    }}>
                        <Box >
                            <CardContent sx={{ color: 'white' }}>
                                <Typography fontSize={25}>{data?.name}</Typography>
                                <Typography level="body-sm">
                                    Address : {data?.address}
                                </Typography>
                                <Typography level="body-sm">
                                    ID : {data?.id}
                                </Typography>
                                <Typography level="body-sm">
                                    Phone : {data?.phone}
                                </Typography>
                                <Typography level="body-sm">
                                    Pincode : {data?.pincode}
                                </Typography>
                                <Typography level="body-sm">
                                    Email : {data?.email}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Box>
                </Container>
            }
        </>
    )
}

export default AccountPage