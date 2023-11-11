import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../../components/Header';
import { Colors, Logo } from '../../constants/Colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ApextInstance from '../../services/axiosInstances/axiosApex';



const ReturnSending = () => {
    const [fdms, setFdms] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        ApextInstance.get('/home').then(() => {
            setFdmsData()
        }).catch(() => {
            if (localStorage.getItem('cpToken')) localStorage.removeItem('cpToken')
            navigate('/apex/login')
        })
    }, [])


    const formatDate = (dateString: string) => {
        const options : Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const transferFdm = (id: string) => {
        ApextInstance.post('return-sending-fdm',{id:id}).then(()=>{
            setTimeout(()=>{setFdmsData()},150)
        })
    }


    const setFdmsData = () => {
        ApextInstance.get('/return-sending-fdms').then((res) => {
            if(res?.data.data) setFdms(res.data?.data)
            else setFdms([])
        }).catch((err) => {
            if(err.response.data.message == 'No data found')setFdms([])
        })
    }


    return (
        <>
            <Header role='apex' />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>Returned FDM to be transfer</h2>
            </center>
            <div className='mt-5 p-5'>

                <Button className='mb-3'
          style={{ backgroundColor: Colors.PrimaryColor, border: 0 ,color:'white'}}
          onClick={() => navigate('/apex/return-recieved')}
        >
          Return recieved
        </Button>

                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-dark'>
                                <TableCell className='text-light' align="center">AWB</TableCell>
                                <TableCell className='text-light' align="center">Origin</TableCell>
                                <TableCell className='text-light' align="center">Destination</TableCell>
                                <TableCell className='text-light' align="center">Status</TableCell>
                                <TableCell className='text-light' align="center">Booking Date</TableCell>
                                <TableCell className='text-light' align="center">Type</TableCell>
                                <TableCell className='text-light' align="center">Send</TableCell>
                            </TableRow>
                        </TableHead>
                        {fdms && <TableBody>
                            {fdms.map((row: any) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" >{row.awbPrefix}{row.awb}</TableCell>
                                    <TableCell align="center">{row.originPin}</TableCell>
                                    <TableCell align="center">{row.destinationPin}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{formatDate(row.bookingTime)}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => { transferFdm(row._id) }}
                                        >
                                            Transfer FDM
                                        </Button>
                                    </TableCell>


                                </TableRow>

                            ))}
                        </TableBody>}

                        { !fdms.length &&
                            <TableBody>
                                <TableRow >
                                    <TableCell /><TableCell /><TableCell />
                                    <TableCell style={{ textAlign: 'center' }}>No Data</TableCell>
                                </TableRow>
                            </TableBody>}

                    </Table>
                </TableContainer>
            </div>
        </>
    );
}


export default ReturnSending



