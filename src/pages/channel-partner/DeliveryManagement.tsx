import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from 'react-bootstrap';
import { Colors, Logo } from '../../constants/Colors';
import Header from '../../components/Header';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { useNavigate } from 'react-router-dom';
import AssignFdmModal from '../../components/channel-partner/AssignFdmModal';
import CP_API from '../../API/channel-partner';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const DeliveryManagement = () => {

    const [rows, setrows] = useState([])
    const navigate = useNavigate()
    const [id, setId] = useState('')

    
    const setData = () => {
        CpInstance.get(CP_API.get_recieved_fdm).then((res) => {
            if (res.data?.data) {
                setrows(res.data?.data)
            }
        })
    }

    useEffect(() => {
        CpInstance.get(CP_API.home).then(() => {
            setData()
        }).catch(() => {
            if (localStorage.getItem('cpToken')) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, [])


    const TransferHandler = (id: string) => {
        setId(id)
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);



    return (
        <>
            <Header role='cp' />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>Delivery Management</h2>
            </center>

            <Container className='mt-5'>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className='mb-3'
                        style={{ backgroundColor: Colors.PrimaryColor, border: 0, marginRight: 10, color: 'white' }}
                        onClick={() => navigate('/cp/booking-history')}
                    >
                        Delivery History
                    </Button>
                    <Button className='mb-3'
                        style={{ backgroundColor: Colors.PrimaryColor, border: 0, color: 'white' }}
                        onClick={() => navigate('/cp/fdm-assigned-employees')}
                    >
                        Assigned FDMS
                    </Button>
                </Box>

                <h3 style={{ textAlign: 'center', color: Colors.SecondaryColor, margin: '%' }}>Pending to Assign</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">AWB</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                <StyledTableCell align="center">Type</StyledTableCell>
                                <StyledTableCell align="center">Assign FDM</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {rows && <TableBody>
                            {rows.map((row: any) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.awbPrefix}{row.awb}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                                    <StyledTableCell align="center">{row.address}</StyledTableCell>

                                    <StyledTableCell align="center">{row.type}</StyledTableCell>

                                    <StyledTableCell align="center">
                                        <Button onClick={() => TransferHandler(row._id)}>Assign</Button>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                            {!rows.length &&
                                <TableRow >
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align='right'>No Pendings</TableCell>
                                </TableRow>
                            }
                        </TableBody>}
                    </Table>
                </TableContainer>

                <AssignFdmModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id = {id}
                    setrows = {setrows}
                />

            </Container>
        </>
    );
}

export default DeliveryManagement

