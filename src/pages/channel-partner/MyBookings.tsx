import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Header from '../../components/Header';
import { Colors, Logo } from '../../constants/Colors';
import { useEffect, useState } from 'react';
import CpInstance from '../../services/axiosInstances/axiosCp';
import DeletBooking from '../../components/channel-partner/DeleteBookingModal';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const MyBookings = () => {

  const [bookingData, setBookings] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [isDeleted, Setdelete] = useState(false);

  if (isDeleted) {
    CpInstance.get('/get-my-bookings').then((res) => {
      setBookings(res.data.bookings)
    }).catch((err) => console.log(err.message, 'messg'))
    Setdelete(false)
  }

  const [del, setDel] = useState('');
  const navigate = useNavigate()


  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  useEffect(() => {
    CpInstance.get('/home').then((res) => {

    }).catch((err) => {
      if (localStorage.getItem('cpToken')) localStorage.removeItem('cpToken')
      navigate('/cp/login')
    })

    CpInstance.get('/get-my-bookings').then((res) => {
      setBookings(res.data.bookings)
    }).catch((err) => console.log(err.message, 'messg'))
  }, [])


  return (
    <>
      <Header role='cp' />
      <center className='mt-5'>
        <img src={Logo.Main}
          style={{ width: "20%" }} alt="" />
        <h2 style={{ color: Colors.SecondaryColor }} className='mt-4'>My Bookings</h2>
      </center>
      <div className='mt-5 p-5'>

        <Button className='mb-3'
          style={{ backgroundColor: Colors.PrimaryColor, border: 0 }}
          onClick={() => navigate('/cp/booking-history')}
        >
          Booking History
        </Button>

        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className='bg-dark'>
                <TableCell className='text-light'>AWB</TableCell>
                <TableCell className='text-light' align="center">Destination</TableCell>
                <TableCell className='text-light' align="center">Status</TableCell>
                <TableCell className='text-light' align="center">Booking Date</TableCell>
                <TableCell className='text-light' align="center">Type</TableCell>
                <TableCell className='text-light' align="center">Edit</TableCell>
                <TableCell className='text-light' align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            {bookingData && <TableBody>
              {bookingData.map((row: any) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.awbPrefix}{row.awb}
                  </TableCell>
                  <TableCell align="center">{row.destinationPin}</TableCell>
                  <TableCell align="center">Booked</TableCell>
                  <TableCell align="center">{formatDate(row.bookingTime)}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => { }} align="center"
                  ><ModeEditIcon /></TableCell>

                  <TableCell
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setModalShow(true)
                      const Consignment = row.awbPrefix + row.awb
                      setDel({ awb: Consignment, id: row._id, Setdelete })
                    }} align="center"
                  ><DeleteForeverIcon style={{ color: 'red' }} /></TableCell>
                </TableRow>

              ))}
            </TableBody>}

            {!bookingData &&
              <TableBody>
                <TableRow >
                  <TableCell /><TableCell /><TableCell />
                  <TableCell style={{ textAlign: 'center' }}>No Data</TableCell>
                </TableRow>
              </TableBody>}

          </Table>
        </TableContainer>

        {/* modal */}
        <DeletBooking
          show={modalShow}
          data={del}
          onHide={() => setModalShow(false)}
        />



      </div>
    </>
  );
}


export default MyBookings



