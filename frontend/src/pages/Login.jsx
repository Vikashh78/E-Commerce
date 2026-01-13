import React, { useState } from 'react'
import Title from '../components/Title'

const Login = () => {

  const [currState, setCurrState] = useState('Sign Up')

  const submitHandler = async (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={submitHandler} 
    className='flex flex-col items-center m-auto w-[90%] sm:w-[60%] mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-8'>
        <p className='text-3xl'>{currState}</p>
      </div>
      {currState === 'Login'? '' : <input className='w-full border-gray-800 px-3 py-2 border' type="text" placeholder='Name' required/>}
      <input className='w-full border-gray-800 px-3 py-2 border' type="email" placeholder='Email' required/>
      <input className='w-full border-gray-800 px-3 py-2 border' type="password" placeholder='Password' required/>

      <div className='flex justify-between text-sm w-full -mt-2'>
        <p className='cursor-pointer text-red-500'>Forgot password?</p>
        {
          currState === 'Login'? 
          <p onClick={() => setCurrState('Sign Up')} className='cursor-pointer text-blue-500'>Create Account</p> : 
          <p onClick={() => setCurrState('Login')} className='cursor-pointer text-blue-500'>Login here</p>
        }
      </div>
      <button className='bg-black text-white text-sm px-4 py-2      cursor-pointer'>{currState === 'Login'? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login