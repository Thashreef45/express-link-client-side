import *as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import CpInstance from '../../services/axiosInstances/axiosCp';

export default function AddEmployeeModal(props: any) {

    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')


    const [err, setErr] = React.useState('')


    const submitHandler = () => {
        const isValidEmail = (eMail: string) => {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            return emailRegex.test(eMail);
        };
        if (phone.length != 10) {
            setErr('Number Should be 10 characters')
            setTimeout(() => {
                setErr('')
            }, 2500)
        } else if (name.length < 5) {
            setErr('')
            setTimeout(() => {
                setErr('Name Should be atleast 5 characters')
            }, 2500)
        } else if (!isValidEmail(email)) {
            setErr('Invalid email address');
            setTimeout(() => {
                setErr('');
            }, 2500);
        } else {
            const data = {
                name,
                phone: Number(phone),
                email
            }
            CpInstance.post('/create-employee',data).then((res)=>{
                CpInstance.get('get-employees').then((res) => {
                    if (res.data?.employees) {
                        props.setrows(res.data.employees)
                    }
                })
                props.onHide()
            }).catch(()=>{})
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
                    Add New Employee
                </Modal.Title>
            </Modal.Header>

            {/* <Modal.Body>
        <h4>{props.name}</h4>

      </Modal.Body> */}
            <Form>
                <Form.Group className="mx-4 mb-5" controlId="exampleForm.ControlInput1">
                    <Form.Label>{props.name}</Form.Label>

                    <Form.Control
                        style={{ height: '3rem', marginBottom: '1rem' }}
                        type="strng"
                        value={name}
                        placeholder="Name"
                        autoFocus
                        maxLength={15}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />

                    <Form.Control
                        style={{ height: '3rem', marginBottom: '1rem' }}
                        type="email"
                        value={email}
                        placeholder="name@express.com"
                        autoFocus
                        maxLength={25}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <Form.Control
                        style={{ height: '3rem' }}
                        type="string"
                        value={phone}
                        placeholder="Phone"
                        maxLength={10}
                        autoFocus
                        onInput={(event) => {
                            const input = event.currentTarget;
                            const value = input.value;
                            if (value === '' || (value.length === 1 && value === '0')) {
                                input.value = '';
                            } else {
                                input.value = value.replace(/[^0-9]/g, '');
                            }
                            setPhone(value)
                        }}
                    />

                    <p className='mt-2 text-danger' style={{ textAlign: 'center' }}>{err}</p>
                </Form.Group>

            </Form>




            <Modal.Footer>
                <Button className='btn-success' onClick={() => submitHandler()}>Add</Button>
                <Button className='btn-danger' onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

