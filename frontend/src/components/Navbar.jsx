import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {NavLink, Link} from 'react-router-dom'

const Navbar = () => {

  const [visible, setVisible] = useState(false)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to="/" ><img src={assets.logo} alt="" className='w-36' /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-900'>

        <NavLink to="/" className='flex flex-col items-center gap-1 '>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to="/collection" className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to="/about" className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to="/contact" className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
          <img src={assets.search_icon} alt="" className='w-5 cursor-pointer'/>

          <div className='group relative'>
            <img src={assets.profile_icon} alt=""  className='w-5 cursor-pointer'/>
            <div className='absolute right-0 pt-4 hidden group-hover:block dropdown-menu'> 
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-700 rounded shadow-lg'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p className='cursor-pointer hover:text-black'>Orders</p>
                <p className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>

          <Link to="/cart" className='relative'> 
            <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
            <p className='absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>5</p>
          </Link>
          
          {/* for mobile phones */}
          <img onClick={() => setVisible(true)}
          src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden'/>
      </div>

      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white ${visible? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-900'>
          <div onClick={() => setVisible(false)}
          className='flex items-center gap-2 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt=""  className='h-4 rotate-180 cursor-pointer'/>
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-1 pl-6 border border-black-1px border-b-0' to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-black-1px border-b-0' to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-black-1px border-b-0' to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-black-1px' to="/contact">CONTACT</NavLink>

        </div>
      </div>

    </div>
  )
}

export default Navbar