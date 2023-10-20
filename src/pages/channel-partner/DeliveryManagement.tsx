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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Typography } from '@mui/material';
import AddEmployeeModal from '../../components/channel-partner/AddEmployeeModal';
import { CardActions } from '@mui/joy';
import { useEffect, useState } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { useNavigate } from 'react-router-dom';


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

    useEffect(() => {
        CpInstance.get('/get-recieved-fdm').then((res) => {
            console.log(res.data,'=><S')
            if (res.data?.data) {
                setrows(res.data?.data)
            }
        })
    }, [])


    const TransferHandler = (name: string) => {
        console.log(name, 'delete')
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
                <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Button className='mb-3'
                        style={{ backgroundColor: Colors.PrimaryColor, border: 0, marginRight: 10, color: 'white' }}
                        onClick={() => navigate('/cp/booking-history')}
                    >
                        Delivery History
                    </Button>
                    <Button className='mb-3'
                        style={{ backgroundColor: Colors.PrimaryColor, border: 0, color: 'white' }}
                        onClick={() => navigate('/cp/booking-history')}
                    >
                        Assigned FDMS
                    </Button>
                </Box>

                <h3 style={{ textAlign: 'center', color: Colors.SecondaryColor, margin: '%' }}>Pending Delivery</h3>
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
                            {rows.map((row: any, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                    {row.awbPrefix}{row.awb}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                                    <StyledTableCell align="center">{row.address}</StyledTableCell>

                                    <StyledTableCell>{row.type}</StyledTableCell>

                                    <StyledTableCell>
                                        <Button onClick={() => TransferHandler('hi')}>Assign</Button>
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

                <CardActions>
                    {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}Transfer
                        style={{ color: "#FFF" }}
                        onClick={() => setModalShow(true)}
                    >
                        Add Employee<AddCircleIcon style={{ marginLeft: "1rem" }} />
                    </Button> */}

                    <AddEmployeeModal
                        setrows={setrows}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </CardActions>

            </Container>
        </>
    );
}

export default DeliveryManagement

