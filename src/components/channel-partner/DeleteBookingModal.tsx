import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CpInstance from '../../services/axiosInstances/axiosCp';
import CP_API from '../../API/channel-partner';

const DeletBooking = (props: any) => {
  const DeleteHandler = (id: string) => {
    CpInstance.delete(`${CP_API.delete_booking}/${id}`).then(() => {
      props.data.Setdelete(true)
    })
    props.onHide()
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
        {props.data && <h3 style={{ textAlign: "center" }}>Are you sure ? you want to delete  {props?.data.awb} Booking.</h3>}
      </Modal.Body>


      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button className='btn-primary' onClick={props.onHide}>Cancel</Button>
        {props?.data && <Button className='btn-danger' onClick={() => DeleteHandler(props.data.id)}>Delete</Button>}
      </Modal.Footer>
    </Modal>
  )
}


export default DeletBooking

