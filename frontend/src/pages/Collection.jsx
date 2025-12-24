import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])

  useEffect(() => {
    setFilterProducts(products);
  }, [])

  return (
    <div className='flex flex-col sm:flex-row gap-2 sm:gap-10  mt-10 border-t-0'>
      
      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} 
        className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`}/>
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter? "" : "hidden"} `}> 
          {/* apply display: block from small screens (≥ 640px) and above */}

          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Men'} className='w-3' /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Women'} className='w-3' /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Kids'} className='w-3' /> Kids
            </p>
          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFilter? "" : "hidden"} `}> 
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Topwear'} className='w-3' /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Bottomwear'} className='w-3' /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Summerwear'} className='w-3' /> Summerwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Winterwear'} className='w-3' /> Winterwear
            </p>
        </div>
      </div>
    </div>

    {/* Right side  */}
    <div className='flex flex-col gap-4'>
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>

          {/* Product Sort  */}
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevent">Sort by: Relevent</option>
            <option value="low to hight">Sort by: Low to High</option>
            <option value="high to low">Sort by: High to Low</option>
          </select>
        </div>
      </div>

    {/* Map Products  */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProducts.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image} 
            />
          ))
        } 
      </div>
    </div>
  
    </div>
  )
}

export default Collection