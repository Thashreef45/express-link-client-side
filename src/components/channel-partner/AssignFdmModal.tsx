import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { Button, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Colors } from '../../constants/Colors';

const AssignFdmModal = (props: any) => {

  const [employees, setEmployees] = useState([])


  const valueSetter = () => {
    CpInstance.get('/get-employees').then((res) => {
      setEmployees(res.data.employees)
    })
  }

  useEffect(() => {
    valueSetter()
  }, [])

  const submitHandler = (employeeId: string) => {
    CpInstance.post('/assign-fdm', { empId: employeeId, id: props.id }).then(() => {
      CpInstance.get('/get-recieved-fdm').then((res) => {
        if (res.status == 200) {
          if (res.data?.data) {
            props.setrows(res.data?.data)
          } else {
            props.setrows([])
          }
          valueSetter()
          props.onHide()
        }
      })
    })
  }

  return (
    <Modal

      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='mb-4'>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose a employee to assign FDM
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, marginBottom: 12 }}>

        {employees && <Box sx={{ width: '60%', backgroundColor: '' }}>
          {employees.map((data: { name: string, _id: string, email: string, phone: number }) => {
            return (
              <Box key={data._id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Typography variant='h6'>{data.name}</Typography>
                <Button sx={{ color: 'white' }} onClick={() => submitHandler(data._id)} variant='contained'>Assign</Button>
              </Box>
            )
          })}
        </Box>}

        {!employees.length &&
          <Box>
            <Typography sx={{ color: Colors.SecondaryColor }} variant='h5'>No Employees</Typography>
            <Link href="/cp/employee-management" >
              <Typography>Add new employee</Typography></Link>
          </Box>
        }

      </Modal.Body>

      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button sx={{
          color: 'white', backgroundColor: '#ef3811',
          '&:hover': { backgroundColor: '#dc3b19', }
        }} variant='contained' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AssignFdmModal

