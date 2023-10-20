import { Box } from "@mui/material"
import { Container } from "@mui/system"
import Header from "../../components/Header"
import { Colors, Logo } from "../../constants/Colors"


const RecievedFdms = () => {
    return (
        <>
        <Header role="cp" />
        <center className='mt-4' >
            <img src={Logo.Main}
                style={{ width: "20%" }} alt="" />
        </center>
        <Box style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
            <h1 style={{ color: Colors.SecondaryColor, marginTop: '0px', marginBottom: '0px' }}>FDM Management</h1>
        </Box>
        <Container sx={{backgroundColor:'grey'}}>
            <p >Here we recieve Fdms</p>
        </Container>
    </>
    )
}

export default RecievedFdms