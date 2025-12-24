import React from 'react'

const NewsLetterBox = () => {
  
    const onSubmitHandler = (e) => {
        e.preventDefault(); //it will stop to reload the page while submit the form
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, facere.
        </p>
        {/* onSubmit() always expects a callback function, not a function call. */}
        <form onSubmit={onSubmitHandler} className='w-90 sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' required className='w-full sm:flex-1 outline-none'/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>
                Subscribe
            </button>
        </form>
    </div>
  )
}

export default NewsLetterBox