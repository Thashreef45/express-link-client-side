import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm'
import CpInstance from '../../services/axiosInstances/axiosCp';
import CP_API from '../../API/channel-partner';

export default function SignIn() {

  let navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('cpToken'))navigate('/cp/home')
  },[])

  const [errRes, errResSetter] = useState('')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement | null>) => {
    event.preventDefault();
    errResSetter("")
    const data = new FormData(event.currentTarget);
    const formData = {
      id: data.get('id'),
      password: data.get('password'),
    }
    if (String(data.get('password')).trim().length < 6) {
      errResSetter("password must be 6 characters")
    } else if (String(data.get('id')).trim().length < 6) {
      errResSetter("ID must be 6 characters")
    }
    else {

      CpInstance.post(CP_API.login, formData).then((res) => {
        localStorage.setItem('cpToken',`Bearer ${res.data.token}`)
        navigate('/cp/home')

      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }
  };

  return (
    <LoginForm title={'Channel Partner'} submitHandler={handleSubmit} errRes={errRes} />
  );
}