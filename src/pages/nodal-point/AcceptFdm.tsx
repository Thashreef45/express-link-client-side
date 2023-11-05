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
import Button from '@mui/material/Button';
import NodalInstance from '../../services/axiosInstances/axiosNp';



const AcceptFdm = () => {

    const [data, setData] = useState([])
    const [address, setAddress] = useState<any>(null)

    


    const navigate = useNavigate()


    const acceptHandler = (id: string) => {
        NodalInstance.post(`/accept-fdm-cp/${id}`,address).then(() => setContent())
    }

    const setContent = async () => {
        NodalInstance.get('/accept-fdm').then((res) => {
            setData(res.data.data)
        })
    }


    useEffect(() => {
        NodalInstance.get('/home').then((res) => {
            setAddress({
                address:res.data.address,
                name:res.data.name,
            })
            setContent()
        }).catch(() => {
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
                                <TableCell className='text-light' align="center">Booking</TableCell>
                                <TableCell className='text-light' align="center">Accept FDM</TableCell>
                            </TableRow>
                        </TableHead>

                        {data && <TableBody>
                            {data.map((row: { id: string, fdmCount: number }, i) => (
                                <TableRow
                                    key={i + 100}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.fdmCount}</TableCell>
                                    <TableCell align="center">
                                        {<Button
                                            onClick={() => acceptHandler(row.id)}
                                            disabled={row.fdmCount <= 0}
                                        >Accept</Button>}
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



