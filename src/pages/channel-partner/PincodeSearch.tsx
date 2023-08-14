import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CpInstance from '../../config/axiosInstances/axiosCp';
import { useNavigate } from 'react-router-dom';
import { FormHelperText } from '@mui/material';


const PincodeSearch = () => {

    const key = localStorage.getItem('cpToken')
    const navigate = useNavigate()
    useEffect(() => {
        CpInstance.get('/home', {
            headers: {
                token: key
            }
        }).then().catch((err) => {
            console.log(err)
            if (key) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, []);

    const [lowerDiv, setLowerDiv] = useState(false)
    const [pincode, setPincode] = useState('')
    const [errRes, errSetter] = useState('')
    const [cpData, cpDataSetter] = useState<any>(null)
    const [cpNotFound, cpNotFoundSetter] = useState('')


    const handleSubmit = () => {
        if (pincode.length > 5) {
            setLowerDiv(true)
            CpInstance.post('/search-by-pincode', { pincode: pincode }, {
                headers: {
                    token: key
                }
            }).then((res) => {
                cpDataSetter(res.data)
                cpNotFoundSetter('')
            })
                .catch((err) => {
                    cpNotFoundSetter(err.response.data.message)
                })
        }
        else {
            errSetter('Enter a valid pincode')
            setLowerDiv(false)
            setTimeout(() => {
                errSetter('')
            }, 1500)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < 6) {
            cpDataSetter(null)
            setLowerDiv(false)
            cpNotFoundSetter('')
        }
        setPincode(event.target.value);
    };


    return (
        <div style={{ height: '92.9vh', width: '100vw' }}>
            {!lowerDiv && <div style={{ height: "20%" }}></div>}
            <div style={{ height: '42.9vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box component="form" sx={{
                    '& .MuiTextField-root': { m: 1 },
                }} noValidate autoComplete="off">
                    <TextField
                        onChange={handleInputChange}
                        id="filled-search"
                        label="Pincode"
                        type="search"
                        variant="filled"
                        name='pincode'
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
                                }
                            },
                        }}
                    />
                </Box><br />



                <Button onClick={() => handleSubmit()} variant="contained" color="primary">
                    Search
                </Button><br />

                <FormHelperText error={true}>{errRes}</FormHelperText>

            </div>

            {lowerDiv &&
                <div style={{
                    backgroundColor: "#26B99A", height: '50vh', width: '100vw',
                    display: "flex", justifyContent: "center", alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: "", height: "50%", width: "50%",
                        display: "flex", justifyContent: "center", alignItems: 'center'
                    }}>
                        {cpData && 
                            <CpDataCard 
                            name={cpData.name} email={cpData.email} phone={cpData.phone}
                            address={cpData.address.address} pincode={cpData.address.pincode}
                            />
                        }
                        {cpNotFound && <h2 className='text-light'>{cpNotFound}</h2>}
                    </div>
                </div>
            }
        </div>
    )
}

export default PincodeSearch;



// Card part--------------------

interface CpCard {
    name:string,phone:number,email:string,
    address:string,pincode:number
}

export function CpDataCard({name,phone,email,pincode,address}:CpCard) {
    return (
        <Card sx={{ width: 400, display: 'flex', justifyContent: 'center' }}>
            <CardContent>
                <Typography variant="h4" component="div">
                    {name}
                </Typography>
                <Typography variant="h6" component="div">
                    Email:{email}
                </Typography>
                <Typography variant="h6" component="div">
                    Phone:{phone}
                </Typography>
                <Typography variant="h6" component="div">
                    Pincode:{pincode}
                </Typography>
                <Typography variant="h6" component="div">
                    Address:{address}
                </Typography>
            </CardContent>
        </Card>
    );
}


