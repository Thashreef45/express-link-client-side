import { Box, Container } from "@mui/system"
import Header from "../../components/Header"
import { Button, TextField, Typography } from "@mui/material"
import { Colors, Logo } from "../../constants/Colors"
import { useState } from "react"


const TrackingPage = () => {
    const [data,setData] = useState('')
    const errMsg = 'Hey'


    return(
        <>
            <Header role="cp" />
            {!data && <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: "20%",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={Logo.Main}
                        style={{ width: "80%",margin:"10%"}} alt="" /> <br />

                    <Typography color={Colors.SecondaryColor} component="h1" variant="h4">
                        Track Consignment
                    </Typography> <br />
                    <Box component="form">

                        <TextField
                            margin="normal"
                            required
                            id="awb"
                            label="AWB"
                            name="awb"
                            autoComplete="id"
                            autoFocus
                            onChange={(e)=>setData('hey')}
                        />
                    </Box>
                    <Button >Track</Button>
                </Box>

                {errMsg && <Typography
                    sx={{textAlign:'center',color:'red'}}
                >{errMsg}</Typography>}
            </Container>}

            {data && 
            <Container>
            <Box
                sx={{
                    width: "100%",
                    height: '80%',
                    backgroundColor: Colors.SecondaryColor,
                    border: 'solid 1px',
                    borderColor: Colors.SecondaryColor,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' }
                }}
            >

                <Box
                    sx={{
                        width: "100%",
                        height: "15vh",
                        // backgroundColor: 'primary.dark',
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <a className="mx-4" href="" >
                        <img src="/src/assets/images/icons8-image-64 (1).png" alt="" />
                    </a>
                    <a href="" >
                        <img src="/src/assets/images/icons8-document-128 (1).png" alt="" />
                    </a>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "15vh",
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <h3 className="text-light">AWB:10000056</h3>
                </Box>


            </Box>

            <Box
                sx={{
                    width: "100%",
                    backgroundColor: Colors.SecondaryColor,

                    border: "solid 1px",
                    borderColor: 'white'
                }}
            >

                <Typography padding={3}
                    sx={{ color: 'white', fontSize: '20px' }}
                    textAlign={'center'}
                >
                    Booking Details
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <Box sx={{
                        // backgroundColor: "white",
                        height: "100%", width: "100%",
                        padding: 2, color: 'white',
                        marginBottom: 1
                    }}>
                        <Typography >Origin Pincode :671123</Typography>
                        <Typography marginTop={2}>Destination Pincode :670302</Typography>
                    </Box>

                    <Box sx={{
                        // backgroundColor: "white",
                        height: "100%", width: "100%",
                        padding: 2, color: 'white',
                        marginBottom: 1
                    }}>
                        <Typography>Booking Date: 11/06/2024</Typography>
                        <Typography marginTop={2}>Consignment Type : Document</Typography>
                    </Box>

                    <Box sx={{
                        // backgroundColor: "white",
                        height: "100%", width: "100%",
                        padding: 2, color: 'white'
                    }}>
                        <Typography >Delivery Status : Intransist</Typography>
                        {/* <Typography marginTop={2}>Destination Pincode :</Typography> */}
                    </Box>
                </Box>
            </Box>


            <Box
                sx={{
                    width: "100%",
                    height: "58.5vh",
                    backgroundColor: Colors.SecondaryColor,
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        width: "100%", color: 'white',
                    }}
                >
                    <Typography sx={{ textAlign: 'center', margin: 3, fontSize: '25px' }}>Tracking History</Typography>
                    <div style={{ width: "100%", height: '85%',display: 'flex',alignItems:'center',justifyContent:'center' }}>
                        <div style={{ width: "80%", height: '95%'}}>
                            <Typography sx={{fontSize:15}}>Booked : </Typography>
                            <Typography sx={{fontSize:15}}>Nodal Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Nodal Send : </Typography>
                            <Typography sx={{fontSize:15}}>Apex Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Apex Send : </Typography>
                            <Typography sx={{fontSize:15}}>Apex Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Apex Send : </Typography>
                            <Typography sx={{fontSize:15}}>Nodal Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Nodal Send : </Typography>
                            <Typography sx={{fontSize:15}}>Cp Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Delivered: </Typography>

                            <Typography sx={{fontSize:15}}>Apex Send : </Typography>
                            <Typography sx={{fontSize:15}}>Nodal Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Nodal Send : </Typography>
                            <Typography sx={{fontSize:15}}>Cp Recieved : </Typography>
                            <Typography sx={{fontSize:15}}>Delivered: </Typography>
                            
                        </div>
                    </div>


                </Box>
            </Box>
        </Container>}
        </>
    )
}

export default TrackingPage