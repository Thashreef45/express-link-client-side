import *as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { useNavigate } from 'react-router-dom';
import CP_API from '../../API/channel-partner';

export default function BuyAwbModal(props: any) {

  const [count, setCount] = React.useState(0)
  const [err, setErr] = React.useState('')

  const navigate = useNavigate()


  const countHandler = (action: string) => {
    if (action == 'inc') {
      if (count < 150) {
        setCount(count + 10)
      }
    } else {
      if (count > 0) setCount(count - 10)
    }
  }

  const submitHandler = (prefix: string) => {
    if (count) {
      if (prefix == 'Normal') {
        prefix = props.cpPrefix
      }
      CpInstance.post(CP_API.buy_awb, {
        quantity: count,
        awbPrefix: prefix,
      }).then(() => {
        navigate('/cp/home')
      }).catch(() => {
        setErr('Failed to Purchase')
        setTimeout(() => {
          setErr('')
          props.onHide()
        }, 3000)
      })
    } else {
      setErr('You have to buy minimum 10 quantities')
      setTimeout(() => {
        setErr('')
        props.onHide()
      }, 3000)
    }

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
          Buy AWB
        </Modal.Title>
      </Modal.Header>

      {/* <Modal.Body>
        <h4>{props.name}</h4>

      </Modal.Body> */}
      <Form>
        <Form.Group className="mx-4 mb-5" controlId="exampleForm.ControlInput1">
          <Form.Label>{props.name}</Form.Label>
          <Form.Control
            style={{ height: '3rem', pointerEvents: 'none' }}
            type="number"
            value={count}
            placeholder="name@example.com"
            autoFocus
          />
          <div className='mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => countHandler('dec')}> - </Button>
            <Button className='mx-2' onClick={() => countHandler('inc')}>+</Button>
          </div>
          <p className='mt-2 text-danger' style={{ textAlign: 'center' }}>{err}</p>
        </Form.Group>

      </Form>


      <Modal.Footer>
        <Button className='btn-success' onClick={() => submitHandler(props.name)}>Buy</Button>
        <Button className='btn-danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

