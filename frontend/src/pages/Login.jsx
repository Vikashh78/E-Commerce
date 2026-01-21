import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {

  const [currState, setCurrState] = useState('Login')
  const { token, setToken, backendURL, navigate } = useContext(ShopContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submitHandler = async (e) => {
    e.preventDefault();

    // API call for login/signup 
    try {
      if(currState === 'Sign Up') {
        const response = await axios.post(backendURL+'/api/user/register', {name, email, password});
        
        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)
        }
        else {
          toast.error(response.data.message)
        }
        
      }
      else { //login
        const response = await axios.post(backendURL+'/api/user/login', {email, password})

        if(response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token) {
      navigate('/')
    }
  }, [token])


  return (
    <form onSubmit={submitHandler} 
    className='flex flex-col items-center m-auto w-[90%] sm:w-[60%] mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-8'>
        <p className='text-3xl'>{currState}</p>
      </div>
      { // if login page the hide the name field
        currState === 'Login'? '' : 
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full border-gray-800 px-3 py-2 border' type="text" placeholder='Name' required/>
      }
      <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full border-gray-800 px-3 py-2 border' type="email" placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full border-gray-800 px-3 py-2 border' type="password" placeholder='Password' required/>

      <div className='flex justify-between text-sm w-full -mt-2'>
        <p className='cursor-pointer text-red-500'>Forgot password?</p>
        {
          currState === 'Login'? 
          <p onClick={() => setCurrState('Sign Up')} className='cursor-pointer text-blue-500'>Create Account</p> 
          : 
          <p onClick={() => setCurrState('Login')} className='cursor-pointer text-blue-500'>Login here</p>
        }
      </div>
      <button className='bg-black text-white text-sm px-4 py-2      cursor-pointer'>{currState === 'Login'? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login