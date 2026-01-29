import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';

const List = (token) => {

  const [list, setList] = useState([]);

  // Function to get product list
  const fetchProductsList = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      if(response.data.success) {
        setList(response.data.productList)
      } 
      else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // Function to remove product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl+'/api/product/remove', {id}, {headers: token})
      console.log(response);
      if(response.data.success) {
        toast.success(response.data.message)
        fetchProductsList()
      } 
      else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchProductsList();  
  },[])


  return (
    <>
      <div>
        <p className='text-2xl pt-2 pb-8 font-semibold text-center'>All products</p>

        <div className='flex flex-col gap-2'>
          {/*----------------- List Table Title -------------*/}
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 text-sm border border-gray-400 bg-gray-200'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>
        </div>

        {list.map((item, index) => (
          <div className='border border-gray-300 bg-gray-100 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 my-1 text-sm ' key={index}>
            <img className='w-16' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right text-lg md:text-center cursor-pointer'>X</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default List