import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Title from '../components/Title'


const Profile = () => {

  const { backendURL, token, navigate } = useContext(ShopContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showchangePassword, setShowchangePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [cnfmPassword, setCnfmPassword] = useState('')

  // API call to get user details
  const userDetails = async () => {
    try {
      const response = await axios.post(backendURL + '/api/user/profile', {}, { headers: { token } })
      if (response.data.success) {
        setName(response.data.user.name)
        setEmail(response.data.user.email)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }


  // API call to update password
  const updatePassword = async (oldPassword, newPassword, cnfmPassword) => {
    try {
      const response = await axios.post(backendURL + '/api/user/update-password', { oldPassword, newPassword, cnfmPassword }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message);
        setOldPassword('')
        setNewPassword('')
        setCnfmPassword('')

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }


  const onSubmitHandler = (e) => {
    e.preventDefault()
  }



  useEffect(() => {
    if (token) {
      userDetails()
    }
  }, [token, name, email])

  return (
    <div>
      <hr />
      <div className='text-2xl text-center my-6 py-4'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>
      <div className='flex flex-col gap-4 border rounded-xl py-4 px-8 text-center w-full sm:max-w-160 mx-auto my-10 text-gray-700 '>
        <p className='text-lg pt-4 font-semibold'>{email}</p>
        <div className='flex justify-around items-center'>
          <div className='flex flex-col gap-y-6 items-start'>
            <p className='text-xl px-2 font-semibold'>{name
            }</p>
            <div className='flex flex-col gap-4 items-start'>
              <p onClick={() => navigate('/orders')} className='border rounded-xl py-2 px-4 bg-black text-white cursor-pointer text-sm'>My orders</p>
              <button onClick={() => setShowchangePassword(prev => !prev)}
                className='border rounded-xl py-2 px-4 bg-black text-white cursor-pointer text-sm'>Change Password</button>
            </div>
          </div>
          <img className='w-48' src={assets.avatar} alt="" />
        </div>
      </div>

      {/* --------------- Change Password ------------ */}
      {
        showchangePassword &&
        <div className=' flex flex-col gap-4 my-16'>
          <h2 className='text-xl font-semibold text-center text-gray-700 mb-2 mt-6'>Update your password here</h2>
          <form onSubmit={onSubmitHandler} className='border rounded-xl w-3/4 sm:max-w-80 mx-auto sm:mx-auto py-4 px-4'>
            <div className='flex flex-col'>
              <div className='flex flex-col items-center gap-2 mt-4'>
                <input onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} className='border border-gray-500 py-1 px-3 rounded-2xl' type="text" placeholder='Old password' required />
                <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className='border border-gray-500 py-1 px-3 rounded-2xl' type="password" placeholder='New password' required />
                <input onChange={(e) => setCnfmPassword(e.target.value)} value={cnfmPassword} className='border border-gray-500 py-1 px-3 rounded-2xl' type="text" placeholder='Confirm new password' required />
              </div>
              <button onClick={() => updatePassword(oldPassword, newPassword, cnfmPassword)} type='submit'
                className='bg-black text-white text-xs mx-auto px-3 py-2 rounded-xl w-2/4 mt-6 cursor-pointer'>Update</button>
            </div>
          </form>
        </div>
      }

    </div>
  )
}

export default Profile