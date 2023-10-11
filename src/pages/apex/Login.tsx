import * as React from 'react';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm'
import ApextInstance from '../../services/axiosInstances/axiosApex';

export default function SignIn() {

  useEffect(()=>{
    if(localStorage.getItem('apexToken'))navigate('/apex/home')
  },[])

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
      ApextInstance.post('/login', formData).then((res) => {
        localStorage.setItem('apexToken',`Bearer ${res.data.token}`)
        navigate('/apex/home')

      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }
  };

  return (
    <LoginForm title={'Apex'} submitHandler={handleSubmit} errRes={errRes} />
  );
}