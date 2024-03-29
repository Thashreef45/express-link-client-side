import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm'
import NodalInstance from '../../services/axiosInstances/axiosNp';
import NODAL_API from '../../API/nodal-point';

export default function SignIn() {

  const [errRes, errResSetter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('nodalToken')
    if (token) {
      navigate('/nodal/home')
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      NodalInstance.post(NODAL_API.login, formData).then((res) => {
        localStorage.setItem('nodalToken', `Bearer ${res.data.token}`)
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