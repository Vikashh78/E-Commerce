import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = (token) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [size, setSize] = useState([])
  const [price, setprice] = useState('')
  const [bestSeller, setBestSeller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('bestSeller', bestSeller)
      formData.append('size', JSON.stringify(size)) // bcoz we can't send array directly

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)
      
      // API Call to add product
      const response = await axios.post(backendUrl+'/api/product/add', formData, {headers: token})

      if(response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setprice('')
        setCategory('')
        setSubCategory('')
        setSize([])
        setBestSeller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 w-full items-start'>

      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={image1? URL.createObjectURL(image1) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>

          <label htmlFor="image2">
            <img className='w-20 cursor-pointer' src={image2? URL.createObjectURL(image2) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>

          <label htmlFor="image3">
            <img className='w-20 cursor-pointer' src={image3? URL.createObjectURL(image3) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>

          <label htmlFor="image4">
            <img className='w-20 cursor-pointer' src={image4? URL.createObjectURL(image4) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-1'>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-125 px-3 py-2' type="text" placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='my-1'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  className='w-full max-w-125 px-3 py-2' placeholder='Write content here..' required>
        </textarea>
      </div>

      <div className='flex flex-col gap-2 sm:flex-row sm:gap-8 w-full'>
        <div className='gap-1'>
          <p className='mb-1'>Select category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-2 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-1'>Sub category</p>
          <select onChange={(e)=>setSubCategory(e.target.value)}className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Kidswear">Kidswear</option>
          </select>
        </div>

        <div>
          <p className='mb-1'>Product price</p>
          <input onChange={(e)=>setprice(e.target.value)} value={price}  className='w-full px-3 py-1 sm:w-31.25' type="number" />
        </div>
      </div> 

      <div className='my-1'>
        <p className='mb-1'>Product sizes</p>
        <div className='flex gap-3'>

          <div onClick={()=>setSize(prev => prev.includes("S")? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${size.includes("S")? 'bg-pink-200' : 'bg-slate-200'} px-4 py-2 cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setSize(prev => prev.includes("M")? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${size.includes("M")? 'bg-pink-200' : 'bg-slate-200'} px-4 py-2 cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setSize(prev => prev.includes("L")? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${size.includes("L")? 'bg-pink-200' : 'bg-slate-200'} px-4 py-2 cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setSize(prev => prev.includes("XL")? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${size.includes("XL")? 'bg-pink-200' : 'bg-slate-200'} px-4 py-2 cursor-pointer`}>XL</p>
          </div>

          <div onClick={()=>setSize(prev => prev.includes("XXL")? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${size.includes("XXL")? 'bg-pink-200' : 'bg-slate-200'} px-4 py-2 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mb-1'>
        <input onChange={()=>setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestSeller'/>
        <label className='cursor-pointer' htmlFor="bestSeller">Add to bestseller</label>
      </div>

      <div className='bg-black text-white px-10 py-2 rounded-full'>
        <button className='cursor-pointer' type='submit'>ADD</button>
      </div>

    </form>
  )
}

export default Add