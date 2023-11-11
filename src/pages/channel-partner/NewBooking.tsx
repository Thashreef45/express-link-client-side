import { Box, Button, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import CpInstance from "../../services/axiosInstances/axiosCp"
import { useNavigate } from "react-router-dom"
import useImageUpload from "../../services/cloudinary/useImageUpload"
import { Logo } from "../../constants/Colors"
import { CPData } from "../../interfaces/booking-data"


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
    const [successMsg, setSuccesMsg] = useState('')
    let imageLink = ''
    const [originData, setOriginData] = useState<CPData | null>(null)
    let desData: { nodalPoint: string, consignmentPrefix: string } = { nodalPoint: '', consignmentPrefix: '' }

    const [pincode, setPincode] = useState('')

    const { uploadImage } = useImageUpload();
    const navigate = useNavigate()

    const token = localStorage.getItem('cpToken')

    const phoneValdator = (number: any) => {
        if (number.length < 11) {
            setNumber(number)
        }
    }

    const setDefaultTypeAsDocument = (data: any) => {
        data.map((element: any) => {
            if (element.typeName == 'Document') {
                setType(element._id)
            }
        })
    }

    //error handling - common function
    const makeError = (err: string) => {
        setErr(err)
        setTimeout(() => {
            setErr("")
        }, 2500);
    }


    useEffect(() => {
        CpInstance.get('/home').then((res) => {
            setPincode(res.data.pincode)
            setOriginData(res.data)
            CpInstance.get('/get-consignment-types').then((res) => {
                setContentTypes(res.data.types)
                setDefaultTypeAsDocument(res.data.types)
            })
        }).catch(() => {
            if (token) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);



    const handleSubmit = async () => {
        if (number.length < 10) {
            makeError('Number should be 10 digits');
            return
        }

        if (address.length < 10) {
            makeError('Address is too short');
            return
        }

        if (!image) {
            makeError('Choose an image');
            return
        }


        // api section
        try {
            await CpInstance.post('/validate-awb', { awb, token: localStorage.getItem('cpToken') });
        } catch (error) {
            makeError('Entered AWB is not valid');
            return
        }

        try {
            await CpInstance.post('/search-by-pincode', { pincode: Number(desPincode) })
                .then((res) => { desData = res.data })
        } catch (error) {
            makeError('Destination Pincode is not serviceable');
            return
        }

        try {
            imageLink = await uploadImage(image)
        } catch (error: any) {
            makeError(error.message);
            return
        }

        const data = {
            awb: awb,
            image: imageLink,
            mobile: Number(number),
            address: address,
            originPin: Number(pincode),
            pincode: Number(desPincode),
            isDoc,
            originAddress: originData?.address,
            contentType: type,
            declaredValue: Number(value),
            isSameNodal:  originData?.nodalPoint === desData?.nodalPoint,
            isSameApex: originData?.consignmentPrefix === desData.consignmentPrefix, 
        };


        console.log(data)
        try {
            await CpInstance.post('/new-booking', data);
        } catch (error) {
            makeError('Booking failed');
            return
        }

        setSuccesMsg('Booking Success');
        setTimeout(() => {
            setSuccesMsg('');
            navigate('/cp/home');
        }, 2500);
    };






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
                    <img src={Logo.Main}
                        style={{ width: "50%" }} alt="" /> <br />

                    <Typography color={"#556080"} component="h1" variant="h5">
                        New Booking
                    </Typography> <br />
                    <Box component="form" onSubmit={() => { handleSubmit() }} noValidate sx={{ mt: 1 }}>

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
                            onChange={() => {
                                const fileInput: any = document.querySelector('input[type="file"]');
                                if (fileInput) {
                                    const file = fileInput.files[0];
                                    setImage(file)
                                }
                            }}
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
                                        }
                                        setDesPincode(value)
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
                                            }
                                            setValue(value)
                                        }
                                    },
                                }}
                            />
                        </Box>}


                        {/* {errRes && <FormHelperText error={true}>{errRes}</FormHelperText>} */}

                        {err && <p className="text-danger m-2">{err}</p>}
                        {successMsg && <p className="text-success m-2">{successMsg}</p>}

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