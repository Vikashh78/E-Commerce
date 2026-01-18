import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            // API call : here we have passed backendUrl+path, body:(email, password)
            const res = await axios.post(backendUrl+'/api/user/admin', {email, password})
            
            if(res.data.success) {
                setToken(res.data.token)
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message) 
        }
    }

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='px-10 py-8 bg-white shadow-lg max-w-md'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-70'>
                    <p className='text-sm font-medium text-gray-700 mb-2 '>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-0' type="email" placeholder='yours@email.com' required/>
                </div>
                <div className='mb-3 min-w-70'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-0' type="password" placeholder='Enter your password' required/>
                </div>
                <button className='w-full bg-black text-white py-2 rounded-xl mt-4 text-sm cursor-pointer' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login