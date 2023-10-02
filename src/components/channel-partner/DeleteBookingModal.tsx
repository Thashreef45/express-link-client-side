import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { useNavigate } from 'react-router-dom';

const DeletBooking = (props: any) => {

  const DeleteHandler = (id: string) => {
    CpInstance.delete(`/delete-booking/${id}`)
  }

  return (
    <Modal

      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='mb-4'>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Booked Consignment
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3 style={{textAlign:"center"}}>Are you sure ? you want to delete  {props.data.awb} Booking.</h3>
      </Modal.Body>


      <Modal.Footer style={{justifyContent:'center'}}>
        <Button className='btn-primary' onClick={props.onHide}>Cancel</Button>
        <Button className='btn-danger' onClick={()=>DeleteHandler(props.data.id)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default DeletBooking

