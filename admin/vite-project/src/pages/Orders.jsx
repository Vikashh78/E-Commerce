import { useEffect } from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'

const Orders = ({token}) => {
 
  const [allOrders, setAllOrders] = useState([]);

  // API Call to fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(backendUrl+'/api/order/list', {}, {headers: {token}})
      // console.log(response.data);
      if(response.data.success) {
        setAllOrders(response.data.allOrdersDetails)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // API call for update status
  const updateStatus = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl+'/api/order/status', {status:event.target.value, orderId}, {headers: {token}});
      if(response.data.success) {
        fetchAllOrders()
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
      <h3>Orders Page</h3>
      <div>
        {
          allOrders.map((order, index) => ( //map 1
            <div key={index} className='grid grid-cols sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs md:text-sm text-gray-700'>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => { //map 2
                      if(index === order.items.length -1) {
                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span> </p>
                      } else {
                        return <p className='py-0.5' key={index}> {item.name} x {item.quantity} <span>{item.size}</span> </p>
                      }
                    })
                  }
                </div>

                <p className='mt-3 mb-2 font-semibold'> {order.address.firstName + " " + order.address.lastName} </p>
                <div>
                  <p> {order.address.street + ", "} </p>
                  <p> {order.address.city + ", " + order.address.state + ", " + order.address.country} </p>
                </div>
                <div>
                  <p> {order.address.phone} </p>
                </div>
              
              </div>
              <div>
                  <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                  <p className='mt-3'>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.updatedAt).toDateString()} </p>
                </div>
              <p className='text-sm sm:text-[15px]'>Total Amount: {currency}{order.amount} </p>

              <select onChange={(event)=>updateStatus(event, order._id)} value={order.status} className='p-2 font-semibold'>
                <option>Order Placed</option>
                <option>Shipped</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders