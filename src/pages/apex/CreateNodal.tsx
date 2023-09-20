import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApextInstance from '../../services/axiosInstances/axiosApex';
import Header from '../../components/Header';





export default function CreateNodal() {

    const [errRes, errResSetter] = useState('')
    const navigate = useNavigate()

    // useEffect(()=>{

    // },[])


    const handleSubmit = async (event: any) => {
        const token = localStorage.getItem('apexToken')
        event.preventDefault();
        errResSetter("")
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (String(data.password).length < 6) {
            errResSetter("password must be 6 characters")
        } else if (String(data.id).trim().length < 6) {
            data.id = String(data.id).trim()
            errResSetter("ID must be 6 characters")
        }
        else if (String(data.email).trim().length < 8) {
            data.email = String(data.email).trim()
            errResSetter("Enter a valid email")
        } else if (String(data.phone).trim().length < 10) {
            errResSetter("Not a valid phone number")
        } else if (String(data.pincode).trim().length != 6) {
            errResSetter("Enter a valid Pincode")
        }
        else if (String(data.address).trim().length < 10) {
            data.address = String(data.address).trim()
            errResSetter("Address is too short")
        }
        else {
            console.log(token, '<<token  data>>', data, '<<')
            ApextInstance.post('/create-nodal', data, {
                headers: { token: token }
            }).then((res) => {
                // localStorage.setItem('apexToken',`Bearer ${res.data.token}`)
                navigate('/apex/home')

            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }
    };


    return (
        < >
            <Header role='apex'></Header>
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
                        Create Nodal Point
                    </Typography> <br />
                    <Box component="form" onSubmit={(e) => { handleSubmit(e) }} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            // autoComplete="id"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="ID"
                            name="id"
                            // autoComplete="id"
                            autoFocus
                        />


                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            // autoComplete="id"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            type="Number"
                            // autoComplete="id"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            // autoComplete="id"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pincode"
                            label="Pincode"
                            name="pincode"
                            type="Number"

                            // autoComplete="id"
                            autoFocus
                        />

                        {errRes && <FormHelperText error={true}>{errRes}</FormHelperText>}


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 2, height: 50 }}
                            style={{ color: "#FFF", fontSize: 17 }}
                        >
                            CREATE
                        </Button>

                    </Box>
                </Box>
            </Container>
        </>
    );
}
