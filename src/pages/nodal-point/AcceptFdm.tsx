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
// import { Button } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import NodalInstance from '../../services/axiosInstances/axiosNp';



const AcceptFdm = () => {

    const [data, setData] = useState([{cp:'hi',fdmCount:4},{cp:'hlo',fdmCount:6}])
    const [pincode, setPincode] = useState()
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [err, setErr] = useState('')


    const navigate = useNavigate()


    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const makeError = (err:string) => {
        setErr(err)
        setTimeout(()=>{
            setErr('')
        },2000)
    }


    useEffect(() => {
        NodalInstance.get('/home').then((res) => {
            NodalInstance.get('/accept-fdm').then((res)=>{
                //logic here set data
            })
        }).catch((err) => {
            if (localStorage.getItem('nodalToken')) localStorage.removeItem('nodalToken')
            navigate('/nodal/login')
        })
    }, [])



    return (
        <>
            <Header role='nodal' />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>Booking Histroy</h2>
            </center>
            <div className='mt-5 p-5'>


                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='bg-dark'>
                                <TableCell className='text-light' align="center">Channel-Partners</TableCell>
                                <TableCell className='text-light' align="center">FDM Count</TableCell>
                                <TableCell className='text-light' align="center">Accept</TableCell>
                            </TableRow>
                        </TableHead>
                        {data && <TableBody>
                            {data.map((row: any) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.cp}</TableCell>
                                    <TableCell align="center">{row.fdmCount}</TableCell>
                                    <TableCell align="center">
                                       <Button>Accept</Button> 
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}


                    </Table>
                </TableContainer>



            </div>
        </>
    );
}


export default AcceptFdm



