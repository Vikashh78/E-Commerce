import { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const  {navigate, backendURL, token, cartItems, setCartItems, products, delivery_fee, getCartAmount } = useContext(ShopContext);

  // instead of having individual useStates() we can do like this...
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    landmark: '',
    city: '',
    zipcode: '',
    state: '',
    country: '',
    phone: ''
  })


  // API to verify razorpay payemnt
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log(response)
        try {
          const { data } = await axios.post(backendURL+'/api/order/verifyRazorpay', response, {headers: {token}})
          // console.log(data);
          
          if(data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(data.message)
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options) 
    rzp.open()
  }



  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormData(data => ({...data, [name]: value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products).find(product => product._id === items)
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      const orderData = {
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        address: formData
      }
           
      //------------- will use switch statement to call API -----------
      switch(paymentMethod) {

        case 'cod': 
          const response = await axios.post(backendURL+'/api/order/cod', orderData, {headers: {token}});
          if(response.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendURL+'/api/order/razorpay', orderData, {headers: {token}})
          // console.log(responseRazorpay);
          if(responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
        break;

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] px-2'>

      {/* ------------- LEFT SIDE ------------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-120'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <div className='flex gap-1 w-full'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} 
            className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='First name'/> <span className='text-red-800'>*</span>
          </div>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName}
          className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='Last name'/>  
        </div>
        <div className='flex gap-1'>
          <input required onChange={onChangeHandler} name='email' value={formData.email}
          className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="email" placeholder='Email'/> <span className='text-red-800'>*</span>
        </div>
        <input required onChange={onChangeHandler} name='street' value={formData.street}
        className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='Street'/>  
        <input required onChange={onChangeHandler} name='landmark' value={formData.landmark}
        className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='Landmark'/>  
        <div className='flex gap-3'>
          <div className='flex gap-1 w-full'>
            <input required onChange={onChangeHandler} name='city' value={formData.city}
            className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='City'/> <span className='text-red-800'>*</span>
          </div>
          <div onChange={onChangeHandler} name='zipcode' value={formData.zipcode}
          className='flex gap-1 w-full'>
            <input required className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="number" placeholder='Zip code'/> <span className='text-red-800'>*</span> 
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='flex gap-1'>
            <input required onChange={onChangeHandler} name='state' value={formData.state}
            className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='State'/> <span className='text-red-800'>*</span>
          </div>
          <input required onChange={onChangeHandler} name='country' value={formData.country}
          className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="text" placeholder='Country'/>  
        </div>
        <div className='flex gap-1'>
          <input className='border border-gray-300 rounded w-1/4 py-1.5 px-3.5' type="text" placeholder='+91' />
          <input required onChange={onChangeHandler} name='phone' value={formData.phone}
          className='border border-gray-300 rounded w-full py-1.5 px-3.5' type="number" placeholder='Phone'/> <span className='text-red-800'>*</span>
        </div>

      </div>

      {/* --------------- RIGHT SIDE --------------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-60'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* ------------- Payment Method Selection ------------ */}
          <div className='flex flex-col lg:flex-row gap-3'>

            <div onClick={() => setPaymentMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border border-gray-200 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-none rounded-full ${paymentMethod === 'stripe'? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setPaymentMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border border-gray-200 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-none rounded-full ${paymentMethod === 'razorpay'? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setPaymentMethod('cod')} className='flex items-center gap-3 p-2 px-3 border border-gray-200 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-none rounded-full ${paymentMethod === 'cod'? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-700 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit'
             className='bg-black text-white text-sm py-2 px-8 cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder