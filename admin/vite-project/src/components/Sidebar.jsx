import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[30%] border-r min-h-screen'>
        <div className='flex flex-col gap-6 pt-4 pl-4 text-[14px]'>

            <NavLink className='flex items-center gap-3 border border-r-0 px-8 py-2' to="/add">
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add item</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-r-0 px-8 py-2' to="/list">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-r-0 px-8 py-2' to="/orders">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar