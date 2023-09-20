import { Box, Button, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import CpInstance from "../../services/axiosInstances/axiosCp"
import { useNavigate } from "react-router-dom"


const NewBooking = () => {

    const [number, setNumber] = useState('')
    const [isDoc, setIsDoc] = useState(true)
    const [contentTypes, setContentTypes] = useState([{}])
    const [type, setType] = useState('')

    const [desPincode, setDesPincode] = useState('')
    const [image, setImage] = useState('')
    const [address, setAddress] = useState('')
    const [awb, setAwb] = useState('')
    const [value, setValue] = useState('')
    const [err, setErr] = useState('')



    const navigate = useNavigate()
    const token = localStorage.getItem('cpToken')
    let pincode: number

    const phoneValdator = (number: any) => {
        if (number.length < 11) {
            setNumber(number)
        }
    }

    useEffect(() => {
        CpInstance.get('/home').then((res) => {
            pincode = res.data.pincode
            CpInstance.get('/get-consignment-types').then((res) => {
                setContentTypes(res.data.types)
            })
        }).catch((err) => {
            console.log(err)
            if (token) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);

    // message newBookingReq {
    //     string awb = 1; -- 
    //     string image = 2; --
    //     int64 mobile = 3;  --
    //     string address = 4; --
    //     int32 pincode = 5; ---
    //     int32 originPin = 6; ---
    //     bool isDoc = 7;
    //     string contentType = 8;
    //     double declaredValue = 9;
    // }

    const handleSubmit = () => {
        if (number.length < 10) {
            setErr('Number Should be 10 digits')
            setTimeout(() => {
                setErr("")
            }, 2500);
        } else if (address.length < 10) {
            setErr('Address too short')
            setTimeout(() => {
                setErr("")
            }, 2500);
        } else if (!image) {
            setErr('Choose a image')
            setTimeout(() => {
                setErr("")
            }, 2500);
        }else if(awb.length < 10){
            setErr('Enter a valid AWB')
            setTimeout(() => {
                setErr("")
            }, 2500);
        } else {
            CpInstance.post('/validate-awb',{awb,token:localStorage.getItem('cpToken')}).then((res)=>{
                
            }).catch((err)=>{

            })
            const data = {
                awb: awb,
                image: image,
                mobile: number,
                address: address,
                originPin: pincode,
                pincode: desPincode,
                isDoc,
                type,
                declaredValue: value
            }

            console.table(data)
        }

    }



    return (
        <>
            <Header role="cp" />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src="/src/assets/images/Screenshot_2023-06-20_121057-removebg-preview.png"
                        style={{ width: "50%" }} alt="" /> <br />

                    <Typography color={"#556080"} component="h1" variant="h5">
                        New Booking
                    </Typography> <br />
                    <Box component="form" onSubmit={(e) => { handleSubmit(e) }} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="awb"
                            label="AWB"
                            name="awb"
                            autoComplete="id"
                            autoFocus
                            onChange={(e) => setAwb(e.currentTarget.value)}
                        // inputProps={{
                        //     inputMode: 'text',
                        //     onInput: (event: React.FormEvent<HTMLInputElement>) => {
                        //         const input = event.currentTarget;
                        //         let value = input.value.toUpperCase();

                        //         if (/^[A-Z]{2}\d{8}$/.test(value)) {
                        //             input.setCustomValidity('');
                        //             // Set the value
                        //             input.value = value;
                        //             setAwb(value);
                        //         } else {
                        //             input.setCustomValidity('Invalid format. Please use the format "PR10000058"');
                        //         }
                        //     },
                        // }}
                        />




                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            onChange={(e) => setImage(e.currentTarget.value)}
                            type="file"
                            name="image"
                            autoComplete="id"
                            autoFocus
                        />



                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="number"
                            value={number}
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="id"
                            autoFocus
                            onChange={(e) => phoneValdator(e.currentTarget.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="address"
                            label="Address"
                            id="address"
                            autoComplete="current-password"
                            onChange={(e) => setAddress(e.currentTarget.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pincode"
                            label="Pincode"
                            name="pincode"
                            type="Number"
                            autoComplete="id"
                            autoFocus
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                onInput: (event: React.FormEvent<HTMLInputElement>) => {
                                    const input = event.currentTarget;
                                    const value = input.value;

                                    if (value === '' || (value.length === 1 && value === '0')) {
                                        input.value = '';
                                    } else {
                                        input.value = value.replace(/[^0-9]/g, '');

                                        if (input.value.length > 6) {
                                            input.value = input.value.slice(0, 6);
                                            setDesPincode(value)
                                        }
                                    }
                                },
                            }}
                        />

                        <Box paddingLeft={'1rem'}
                            marginBottom={'1rem'}
                        >
                            <div>
                                <p>Document</p>
                                <input
                                    onClick={() => setIsDoc(true)}
                                    name="isDoc" type="radio" />
                            </div>

                            <div>
                                <p>Non-Document</p>
                                <input
                                    onClick={() => setIsDoc(false)}
                                    name="isDoc" type="radio" />
                            </div>

                        </Box>

                        {!isDoc && <Box>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Content-Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                >
                                    {contentTypes.map((value: any) => {
                                        return (<MenuItem onClick={() => setType(value._id)} key={value._id} value={value.typeName}>{value.typeName}</MenuItem>)
                                    })}

                                </Select>
                            </FormControl>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="value"
                                label="Declared-Value (In Rupees)"
                                name="value"
                                autoComplete="id"
                                autoFocus
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    onInput: (event: React.FormEvent<HTMLInputElement>) => {
                                        const input = event.currentTarget;
                                        const value = input.value;

                                        if (value === '' || (value.length === 1 && value === '0')) {
                                            input.value = '';
                                        } else {
                                            input.value = value.replace(/[^0-9]/g, '');

                                            if (input.value.length > 5) {
                                                input.value = input.value.slice(0, 6);
                                                setValue(value)
                                            }
                                        }
                                    },
                                }}
                            />
                        </Box>}

                        {/* {errRes && <FormHelperText error={true}>{errRes}</FormHelperText>} */}

                        {err && <p className="text-danger m-2">{err}</p>}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 2, height: 50 }}
                            style={{ color: "#FFF", fontSize: 17 }}
                            onClick={(() => handleSubmit())}
                        >
                            CREATE
                        </Button>

                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default NewBooking