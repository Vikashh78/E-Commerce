import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const List = () => {

  const [list, setList] = useState([]);

  const fetchProductsList = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      if(response.data.success) {
        setList(response.data.productList)
        toast.success(response.data.message)
      } 
      else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <>
      <div>
        <p>All products list</p>

        <div className='flex flex-col gap-2'>
          {/* List Table Title */}
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 text-sm border border-gray-400 bg-gray-200'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>

        </div>

      </div>
    </>
  )
}

export default List