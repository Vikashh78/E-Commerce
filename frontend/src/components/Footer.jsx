import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex justify-center flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-20 my-10 mt-40 text-sm p
        ml-5'>

            <div className='ml-2 mb-5 w-32'>
                <img src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, animi nostrum fugit exercitationem nesciunt esse!</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-121-456-7890</li>
                    <li>developer@dev.com</li>
                </ul>
            </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
                <hr className='w-full sm:w-2/3' />
                <p className='py-5 text-sm'>Copyright @2025 forever.com - All rights reserved. </p>
        </div>
    </div>
  )
}

export default Footer