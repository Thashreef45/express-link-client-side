import { useParams } from "react-router-dom"
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
import DeliveryUpdateModal from "../../components/channel-partner/DeliveryUpdateModal";


//
import { Page, Text, View, Image, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import CP_API from "../../API/channel-partner";



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

let data: any
let homeData = {id:"" ,}
let employeeData = {name:""}

const AssignedFdms = () => {
    const params = useParams()
    const [rows, setrows] = useState([])
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const [isReturned, setIsReturned] = useState<any>(false)
    const [Updated, setUpdated] = useState(false)



    const setData = () => {
        CpInstance.get(`${CP_API.assigned_fdms}/${params.id}`).then((res) => {
            if (res.data?.data) {
                setrows(res.data.data)
                data = res.data.data
            } else setrows([])
        })
    }

    const setEmployeeData = () => {
        CpInstance.get(`${CP_API.get_employee}/${params.id}`).then((res) => {
            employeeData = res.data.data
        })
    }

    if (Updated) {
        setData()
        setUpdated(false)
    }

    useEffect(() => {
        CpInstance.get(CP_API.home).then((res) => {
            homeData = res.data
            setData()
            setEmployeeData()
        }).catch(() => {
            if (localStorage.getItem('cpToken')) localStorage.removeItem('cpToken')
            navigate('/cp/login')
        })
    }, [])


    const updateStatus = (id: string, isreturned: Boolean) => {
        setId(id)
        setIsReturned(isreturned)
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);



    return (
        <>
            <Header role='cp' />
            <center className='mt-5'>
                <img src={Logo.Main}
                    style={{ width: "20%" }} alt="" />
                <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>Assigned Tasks</h2>
            </center>


            <Container className='mt-5'>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className='mb-3 mt-2'
                        variant='contained'
                        disabled={!rows.length}
                    >
                        <PDFDownloadLink style={{ textDecoration: 'none', color: 'white' }} document={generatePDF()} fileName="drs.pdf">
                            {({loading }) =>
                                loading ? 'Loading document...' : 'Download DRS'
                            }
                        </PDFDownloadLink>
                    </Button>
                </Box>


                {/* <h3 style={{ textAlign: 'center', color: Colors.SecondaryColor, margin: '%' }}>Assigned Tasks</h3> */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">AWB</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Address</StyledTableCell>
                                <StyledTableCell align="center">Type</StyledTableCell>
                                <StyledTableCell align="center">Update Status</StyledTableCell>
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
                                        <Button onClick={() => updateStatus(row._id, row.isReturned)}>Update</Button>
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


                <DeliveryUpdateModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    id={id}
                    setupdated={setData}
                    isreturned={isReturned}
                />
            </Container>
        </>
    );
}

export default AssignedFdms


const currentDateTime = () => {
    const options:any = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',second: '2-digit' };
    return new Date().toLocaleString(undefined, options);
}







function generatePDF() {
    // Define the content for your PDF using @react-pdf/renderer components


    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>

                    <View style={{ width: '100%', height: '80', display: 'flex', flexDirection: 'row' }}>

                        <View style={{ width: '60%', height: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Image src={Logo.Main} style={{ height: 40, width: 150 }} />
                        </View>

                        <View style={{ width: '40%', height: '100%', alignItems: 'center', marginTop: 10 }}>
                            <View>
                                <Text style={styles.employee}>{currentDateTime()}</Text>
                                <Text style={styles.employee}>CP ID : {homeData.id}</Text>
                                <Text style={styles.employee}>Employee : {employeeData.name}</Text>

                            </View>
                        </View>
                    </View>

                    <View style={styles.table}>

                        <View style={styles.tableRow}>

                            <View style={[styles.tableCell, styles.tableHeader]}>
                                <Text>Consignee</Text>
                            </View>
                            <View style={[styles.tableCell, styles.tableHeader]}>
                                <Text>AWB</Text>
                            </View>
                            <View style={[styles.tableCell, styles.tableHeader]}>
                                <Text>Reciever Sign</Text>
                            </View>
                            <View style={[styles.tableCell, styles.tableHeader]}>
                                <Text>Remarks</Text>
                            </View>
                        </View>

                        {data && data.map((element:any,index:number) => {
                            return(<View key={index+100} style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text>
                                        {element.address}{element.mobile}
                                    </Text>
                                </View>
                                <View style={styles.tableCell}>
                                    <Text>{element.awbPrefix}{element.awb}</Text>
                                </View>
                                <View style={styles.tableCell}></View>
                                <View style={styles.tableCell}></View>
                            </View>)
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );

    return MyDocument;

}


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        width: '100%',
        border: 1,
        borderStyle: 'solid',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        flex: 1,
        border: 0.4,
        padding: 5,
        textAlign: 'center',
        fontSize: 10,
        height: 65,
        justifyContent: 'center',
    },
    tableHeader: {
        height: 50,
        fontSize: 14,
        backgroundColor: Colors.PrimaryColor,
        color: "white"
    },

    employee: {
        fontSize: 10,
    }
});




