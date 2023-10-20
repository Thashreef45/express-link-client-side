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
import CpInstance from '../../services/axiosInstances/axiosCp';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';



const BookingHistory = () => {

    const [data, setData] = useState([])
    const [pincode, setPincode] = useState()
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [err, setErr] = useState('')


    const navigate = useNavigate()


    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const makeError = (err: string) => {
        setErr(err)
        setTimeout(() => {
            setErr('')
        }, 2000)
    }


    useEffect(() => {
        CpInstance.get('/home').then((res) => {
            setPincode(res.data.pincode)
        }).catch((err) => {
            if (localStorage.getItem('cpToken')) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, [])

    const submitHandler = () => {
        const fromDateObj: Date = new Date(fromDate);
        const toDateObj: Date = new Date(toDate);
        const dateDifferenceInDays: number = (toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 60 * 60 * 24);

        if (!fromDate) {
            makeError('Select from Date')
        }
        else if (!toDate) {
            makeError("Select to Date")
         }
        else {
            if (fromDate > toDate) {
                makeError('From date should be less than To data')
            } else if (dateDifferenceInDays >= 11) {
                makeError('10 days only allowed')
            } else {
                CpInstance.post('/get-booking-history', { from: fromDate, to: toDate, pincode }).then((res) => {
                    console.log(res.data,'re$$')
                    setData(res.data.data)
                })
            }
        }
    }


    return (
        <>
            <Header role='cp' />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>Booking Histroy</h2>
            </center>
            <div className='mt-5 p-5'>


                <input
                    className='mb-3'
                    type="date"
                    onChange={(e) => setFromDate(e.currentTarget.value)}
                    max={new Date().toISOString().split('T')[0]}
                />
                <input
                    className='mb-3 mx-3'
                    type="date"
                    onChange={(e) => setToDate(e.currentTarget.value)}
                    max={new Date().toISOString().split('T')[0]}

                />
                <Button className='m-3 mt-2'
                    variant='contained'
                    onClick={() => submitHandler()}
                >
                    Filter
                </Button>

                {err && <span className='text-danger'>{err}</span>}

                {/* <Button
                    className='mb-3 mt-2'
                    variant='contained'
                    onClick={() => navigate('/cp/my-bookings')}
                >
                    Back To Recent Bookings
                </Button> */}





                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-dark'>
                                <TableCell className='text-light'>AWB</TableCell>
                                <TableCell className='text-light' align="center">Destination</TableCell>
                                <TableCell className='text-light' align="center">Status</TableCell>
                                <TableCell className='text-light' align="center">Booking Date</TableCell>
                                <TableCell className='text-light' align="center">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        {data && <TableBody>
                            {data.map((row: any) => (
                                <TableRow
                                    key={row.awb}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.awbPrefix}{row.awb}
                                    </TableCell>
                                    <TableCell align="center">{row.destinationPin}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{formatDate(row.bookingTime)}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>}

                        {!data &&
                            <TableBody>
                                <TableRow >
                                    <TableCell /><TableCell />
                                    <TableCell style={{ textAlign: 'center' }}>No Data</TableCell>
                                </TableRow>
                            </TableBody>}

                    </Table>
                </TableContainer>

            </div>
        </>
    );
}


export default BookingHistory



