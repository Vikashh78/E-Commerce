import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const {products} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))

    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
        setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
  }

  // Sort function 
  const sortProducts = () => {
    let filteProductsCopy = filterProducts.slice();

    switch(sortType) {
      case 'low-high':
        setFilterProducts(filteProductsCopy.sort((a, b) => (a.price - b.price)));
        break;
      
      case 'high-low':
        setFilterProducts(filteProductsCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory])

  useEffect(() => {
    sortProducts();
  }, [sortType])


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
              <input type="checkbox" value={'Men'} onClick={toggleCategory} className='w-3' /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Women'} onClick={toggleCategory} className='w-3' /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Kids'} onClick={toggleCategory} className='w-3' /> Kids
            </p>
          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFilter? "" : "hidden"} `}> 
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} className='w-3' /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} className='w-3' /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} className='w-3' /> Winterwear
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
          <select onClick={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 cursor-pointer'>
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-hight">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
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