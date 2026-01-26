import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify'


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '')

  //using localStorage to prevent from logout on reload the page
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token])

  return (
    <div className='bg-gray-50 max-h-screen'>
      <ToastContainer />
      { token === ""? 
      <Login setToken={setToken} /> // passed setToken as props
      :
      <>
        <Navbar setToken={setToken} />
        <hr />
        <div className='flex'>
          <Sidebar />
          <div className='w-[60%] mx-auto ml-[max(5vw, 30px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/' element={ <Add token={token} /> } />
                <Route path='/add' element={ <Add token={token} /> } />
                <Route path='/list' element={ <List token={token} /> } />
                <Route path='/orders' element={ <Orders token={token} /> } />
            </Routes>
          </div>
        </div>
      </> }
      
    </div>
  )
}

export default App