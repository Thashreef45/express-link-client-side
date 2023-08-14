import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm'
import NodalInstance from '../../config/axiosInstances/axiosNp';

export default function SignIn() {

  const [errRes, errResSetter] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | null>) => {
    event.preventDefault();
    errResSetter("")
    const data = new FormData(event.currentTarget);
    const formData = {
      id: data.get('id'),
      password: data.get('password'),
    }
    if (String(data.get('password')).length < 6) {
      errResSetter("password must be 6 characters")
    } else if (String(data.get('id')).length < 6) {
      errResSetter("ID must be 6 characters")
    }
    else {
      NodalInstance.post('/login', formData).then((res) => {
        localStorage.setItem('nodalToken',`Bearer ${res.data.token}`)
        navigate('/nodal/home')

      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }
  };

  return (
    <LoginForm title={'Nodal Point'} submitHandler={handleSubmit} errRes={errRes} />
  );
}