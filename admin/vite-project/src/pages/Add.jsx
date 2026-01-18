import React from 'react'
import { assets } from '../assets/assets'

const Add = () => {
  return (
    <form className='flex flex-col gap-3 w-full items-start'>

      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden/>
          </label>

          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden/>
          </label>

          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden/>
          </label>

          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={assets.upload_area} alt="" />
            <input type="file" id='image1' hidden/>
          </label>
        </div>
      </div>

      <div>
        <p className='mb-1'>Product name</p>
        <input className='w-full max-w-125 px-3 py-2' type="text" placeholder='Type here'/>
      </div>
    </form>
  )
}

export default Add