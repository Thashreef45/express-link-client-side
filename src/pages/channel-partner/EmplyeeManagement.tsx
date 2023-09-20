import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from 'react-bootstrap';
import { Colors } from '../../constants/Colors';
import Header from '../../components/Header';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import AddEmployeeModal from '../../components/channel-partner/AddEmployeeModal';
import { CardActions } from '@mui/joy';
import { useEffect, useState } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';


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



const EmployeeManagement = () => {

    const [rows, setrows] = useState([])

    useEffect(() => {
        CpInstance.get('get-employees').then((res) => {
            if (res.data?.employees) {
                setrows(res.data?.employees)
            }
        })
    }, [])

    const editHandler = (name: string) => {
        console.log(name, '<<name')
    }

    const deleteHandler = (name: string) => {
        console.log(name, 'delete')
    }

    const [modalShow, setModalShow] = useState(false);



    return (
        <>
            <Header role='cp' />
            <center className='mt-5'>
                <img src="/src/assets/images/Screenshot_2023-06-20_121057-removebg-preview.png"
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>Employee Management</h2>
            </center>
            <Container className='mt-5'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Remove</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any,index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>

                                    <StyledTableCell
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { editHandler(row.name) }} align="center"
                                    ><ModeEditIcon /></StyledTableCell>


                                    <StyledTableCell
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { deleteHandler(row.name) }} align="center"
                                    ><DeleteForeverIcon style={{ color: 'red' }} /></StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <CardActions>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ color: "#FFF" }}
                        onClick={() => setModalShow(true)}
                    >
                        Add Employee<AddCircleIcon style={{ marginLeft: "1rem" }} />
                    </Button>

                    <AddEmployeeModal
                        setrows = {setrows}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </CardActions>

            </Container>
        </>
    );
}

export default EmployeeManagement 