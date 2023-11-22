import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Logo } from "../constants/Colors"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Colors } from '../constants/Colors'



const NotFound = (props:any) => {

    const navigate = useNavigate()

    return (
        < >
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
            </center>
            <Box sx={{
                // backgroundColor: 'green',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                // height:'300px'
            }} component="main" maxWidth="xs">

                <Box sx={{
                    // backgroundColor: 'red',
                    height: "70%", width: "70%",
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize: 250,
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
                            marginBottom: -5,
                            color: Colors.PrimaryColor
                        }}>404</Typography>
                        <br></br>
                        <Typography sx={{
                            fontSize: 30,
                            fontFamily: 'sans-serif',
                            textAlign: 'center',
                        }}>
                            Ooops!!
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontFamily: "unset",
                                fontSize: 25,
                                marginTop: 3,
                                marginBottom: 3,
                                // color:Colors.PrimaryColor
                            }}
                        >THAT PAGE DOESN'T EXIST OR IS UNAVAILABLE .</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: '100vw', display: 'flex', alignItems: 'center', 'justifyContent': 'center'
            }}>

                <Button style={{
                    width: '20%', height: '65px', backgroundColor: '  #3246b7  ',
                    fontSize: 20,
                    borderRadius: 15
                }}
                    onClick={() => navigate(`/${props.role}/home`)}
                >
                    Back To Home
                </Button>

            </Box>
        </>
    )
}


export default NotFound