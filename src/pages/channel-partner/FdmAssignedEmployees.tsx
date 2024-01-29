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
import { useEffect, useState } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const FdmAssignedEmployees = () => {

    const navigate = useNavigate()
    const [rows, setrows] = useState([])

    useEffect(() => {
        CpInstance.get(CP_API.home).then(() => {
            CpInstance.get(CP_API.get_employees).then((res) => {
                if (res.data?.employees) {
                    setrows(res.data?.employees)
                }
            })
        }).catch(()=>{
            if(localStorage.getItem('cpToken')){
                localStorage.removeItem('cpToken')
            }
            navigate('/cp/login')
        })
    }, [])

    const viewClickHandler = (id:string) => {
        navigate(`/cp/assigned-fdms/${id}`)
    }



    return (
        <>
            <Header role='cp' />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>View assigned FDMs</h2>
            </center>
            <Container className='mt-5'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>


                                    <StyledTableCell align="center">
                                        <Button
                                        onClick={()=>viewClickHandler(row._id)}
                                        >View</Button>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default FdmAssignedEmployees