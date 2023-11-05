import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CpInstance from '../../services/axiosInstances/axiosCp';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Colors } from '../../constants/Colors';
import useImageUpload from '../../services/cloudinary/useImageUpload';



const DeliveryUpdateModal = (props: any) => {
    const [err, setErr] = useState('')
    const [status, setStatus] = useState([])
    const { uploadImage } = useImageUpload()
    let imageLink = ''
    const [image, setImage] = useState('')


    const valueSetter = () => {
        CpInstance.get('/delivery-status').then((res) => {
            setStatus(res.data.data)
        })
    }

    useEffect(() => {
        valueSetter()
    }, [])

    const makeError = (x: string) => {
        setErr(x)
        setTimeout(() => {
            setErr('')
        }, 2000)
    }


    const submitHandler = async (id: string) => {

        if (!image) {
            makeError('Please select a DRS Image')
            return
        } else {
            try {
                imageLink = await uploadImage(image)
            } catch (error: any) {
                makeError(error.message)
                return
            }
            let data = { id: props.id, statusId: id, image: imageLink }
            CpInstance.post('/update-delivery-status', data).then(() => {
                props.setupdated()
                props.onHide()
            })
        }
    }

    return (
        <Modal

            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='mb-4'>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Status
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, marginBottom: 12 }}>

                {status && !props.isreturned && <Box sx={{ width: '70%', backgroundColor: '' }}>
                    {status.map((data: { statusName: string, _id: string, email: string, phone: number }) => {
                        return (
                            <Box key={data._id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                <Typography variant='h6'>{data.statusName}</Typography>
                                <Button sx={{ color: 'white' }} onClick={() => submitHandler(data._id)} variant='contained'>Update</Button>
                            </Box>
                        )
                    })}
                </Box>}

                {!status &&
                    <Box>
                        <Typography sx={{ color: Colors.SecondaryColor }} variant='h5'>No Status</Typography>
                    </Box>
                }

                {status && props.isreturned && <Box sx={{ width: '70%', backgroundColor: '' }}>
                    {status.map((data: { statusName: string, _id: string, email: string, phone: number }) => {
                        if (data.statusName == 'Delivered') {
                            return (
                                <Box key={data._id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <Typography variant='h6'>{data.statusName}</Typography>
                                    <Button sx={{ color: 'white' }} onClick={() => submitHandler(data._id)} variant='contained'>Update</Button>
                                </Box>
                            )
                        }
                    })}
                </Box>}

                <TextField
                    margin="normal"
                    required
                    // fullWidth
                    id="image"
                    onChange={() => {
                        const fileInput:any = document.querySelector('input[type="file"]');
                        if (fileInput) {
                            const file = fileInput.files[0];
                            setImage(file)
                        }
                    }}
                    type="file"
                    name="image"
                    autoComplete="id"
                    autoFocus
                />


                {err && <Typography sx={{ color: 'red' }}>{err}</Typography>}

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

export default DeliveryUpdateModal

