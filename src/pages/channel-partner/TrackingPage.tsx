import { Box, Container } from "@mui/system"
import Header from "../../components/Header"
import { Button, TextField, Typography } from "@mui/material"
import { Colors, Logo } from "../../constants/Colors"
import { useState } from "react"
import CpInstance from "../../services/axiosInstances/axiosCp"
import TrackingResponse from "../../interfaces/tracking-results"


const TrackingPage = () => {

    const [data, setData] = useState <TrackingResponse|null> (null)
    const [errMsg, setErrMsg] = useState('')
    const [awb, setAwb] = useState('')

    const formatDate = (dateString: string) => {
        const options : Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const makeError = (err: string) => {
        setErrMsg(err)
        setTimeout(() => {
            setErrMsg('')
        }, 2000)
    }

    const HandleAwbInputs = (value: string) => {
        if (value.length < 3) {
            if (!isNaN(Number(value[0]))) {
                makeError('First two character should be Letters')
            } else if (!isNaN(Number(value[1]))) {
                makeError('First two character should be Letters')
            } else {
                setAwb(value.toUpperCase())
            }
        } else {
            let num = value.slice(2)
            if (isNaN(Number(num))) {
                makeError('First Two Characters should be letters others should be numbers')
            }
            else setAwb(value)

        }
    }

    const HandleTracking = () => {
        if (awb.length < 10) {
            makeError('AWB Should be 10 characters')
        } else {
            CpInstance.get(`/tracking/${awb}`).then((res) => {
                console.log(res.data.data, '#track')
                setData(res.data.data)
            }).catch((err) => {
                makeError(err.response.data.message)
            })
        }
    }



    return (
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
                        style={{ width: "80%", margin: "10%" }} alt="" /> <br />

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
                            value={awb}
                            autoComplete="id"
                            autoFocus
                            onChange={(e) => HandleAwbInputs(e.target.value)}
                            inputProps={{ maxLength: 10 }}
                        />
                    </Box>
                    <Button
                        onClick={HandleTracking}
                    >Track</Button>
                </Box>
                <br />
                {errMsg && <Typography
                    sx={{ textAlign: 'center', color: 'red' }}
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
                            <a className="mx-4" href={data.image} target="_blank" rel="noopener noreferrer" >
                                <img src="https://res.cloudinary.com/expresslink/image/upload/v1699186314/icons8-image-64_1_zcvys4.png" alt="" />
                            </a>

                            {data.drs &&
                                <a href={data.drs} target="_blank" rel="noopener noreferrer" >
                                    <img src="https://res.cloudinary.com/expresslink/image/upload/v1699186324/icons8-document-128_1_vgxhrc.png" alt="" />
                                </a>}

                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                height: "15vh",
                                display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <h3 className="text-light">AWB:{data.awbPrefix}{data.awb}</h3>
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
                                <Typography >Origin Pincode :{data.originPin}</Typography>
                                <Typography marginTop={2}>Destination Pincode :{data.destinationPin}</Typography>
                            </Box>

                            <Box sx={{
                                // backgroundColor: "white",
                                height: "100%", width: "100%",
                                padding: 2, color: 'white',
                                marginBottom: 1
                            }}>
                                <Typography>Booking Date: {formatDate(data.bookingTime)}</Typography>
                                <Typography marginTop={2}>Consignment Type : {data.contentType}</Typography>
                            </Box>

                            <Box sx={{
                                // backgroundColor: "white",
                                height: "100%", width: "100%",
                                padding: 2, color: 'white'
                            }}>
                                {data?.notDelivered?.recieving?.cpUpdate && data?.isReturned && <Typography >Status : RTO Delivered ({data.status})</Typography>}
                                {!data?.notDelivered?.recieving?.cpUpdate && data?.isReturned && <Typography >Status : RTO Intransist ({data.status})</Typography>}
                                {!data?.isReturned && <Typography >Status : {data?.status}</Typography>}
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
                        {data && <Box
                            sx={{
                                width: "100%", color: 'white',
                            }}
                        >
                            <Typography sx={{ textAlign: 'center', margin: 3, fontSize: '25px' }}>Tracking History</Typography>
                            <div style={{ width: "100%", height: '85%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: "80%", height: '95%' }}>
                                    <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Booked</span> : {data.originAddress} <span className="mx-3">{formatDate(data.bookingTime)}</span></Typography>

                                    {data?.sending &&
                                        <div>
                                            {data?.sending?.nodalRecieved && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Nodal Recieved</span> : {data.sending.nodalRecieved.name}&nbsp;&nbsp; {formatDate(data.sending.nodalRecieved.Date)} </Typography>}
                                            {data?.sending?.nodalSend && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Nodal Send</span> : {formatDate(data.sending.nodalSend)}  </Typography>}
                                            {data?.sending?.apexRecieved && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Apex Recieved</span> : {data.sending.apexRecieved.name}&nbsp;&nbsp; {formatDate(data.sending.apexRecieved.Date)} </Typography>}
                                            {data?.sending?.apexSend && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Apex Send</span> : {formatDate(data.sending.apexSend)}</Typography>}
                                        </div>
                                    }

                                    {data?.recieving &&
                                        (<div>
                                            {data?.recieving?.apexRecieved && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Apex Recieved: </span> {data.recieving.apexRecieved.name} &nbsp;&nbsp;{formatDate(data.recieving.apexRecieved.Date)} </Typography>)}
                                            {data?.recieving?.apexSend && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Apex Send : </span> {formatDate(data.recieving.apexSend)}  </Typography>}
                                            {data?.recieving?.nodalRecieved && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Nodal Recieved : </span> {data.recieving.nodalRecieved.name}&nbsp;&nbsp;{formatDate(data.recieving.nodalRecieved.Date)} </Typography>}
                                            {data?.recieving?.nodalSend && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Nodal Send : </span>{formatDate(data.recieving.nodalSend)} </Typography>}
                                            {data?.recieving?.cpRecieved && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Cp Recieved : </span>{data.recieving.cpRecieved.name} &nbsp;&nbsp;{formatDate(data.recieving.cpRecieved.Date)} </Typography>}
                                            {!data?.isReturned && data?.recieving?.cpUpdate && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Delivered : </span> {formatDate(data.recieving.cpUpdate)}</Typography>}
                                            {data?.isReturned && <Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Return : </span> {formatDate(data.recieving.cpUpdate)}&nbsp;&nbsp;{`(${data.status})`}</Typography>}
                                        </div>)
                                        }

                                    {data?.notDelivered &&
                                        (<div>
                                            {data?.notDelivered?.sending?.apexRecieved && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Apex Recieved</span> : </Typography>)}
                                            {data?.notDelivered?.sending?.apexSend && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Apex Send</span> : </Typography>)}
                                            {data?.notDelivered?.recieving?.cpRecieved && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Cp Recieved : </span>{data.notDelivered.recieving.cpRecieved.name}&nbsp;&nbsp;{formatDate(data.notDelivered.recieving.cpRecieved.Date)}</Typography>)}
                                            {data?.notDelivered?.recieving?.cpUpdate && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Return Delivered : </span>{formatDate(data.notDelivered.recieving.cpUpdate)}</Typography>)}
                                            {data?.notDelivered?.sending?.nodalRecieved && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Nodal Recieved :</span>{data.notDelivered.sending.nodalRecieved.name}&nbsp;&nbsp;{formatDate(data.notDelivered.sending.nodalRecieved.Date)} </Typography>)}
                                            {data?.notDelivered?.sending?.nodalSend && (<Typography sx={{ fontSize: 15 }}><span style={{ fontWeight: 'bold' }}>Nodal Send :</span> {formatDate(data.notDelivered.sending.nodalSend)}</Typography>)}
                                        </div>)
                                        }

                                </div>
                            </div>


                        </Box>}
                    </Box>
                </Container>}
        </>
    )
}

export default TrackingPage