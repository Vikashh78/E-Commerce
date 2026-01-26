import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'

const Orders = ({token}) => {
 
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(backendUrl+'/api/order/list', {}, {headers: {token}})
      console.log(response.data);
      if(response.data.success) {
        setAllOrders(response.data.allOrdersDetails)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token) {
      fetchAllOrders()
    }
  }, [token])


  return (
    <div>

    </div>
  )
}

export default Orders