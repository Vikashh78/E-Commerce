import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div className='p-2'>

      <div className='text-2xl border-t pt-10 mb-10'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 gap-10 flex flex-col justify-center md:flex-row '>
        <img className='w-full md:max-w-120' src={assets.contact_img} alt="" />
        <div className='gap-6 flex flex-col items-start justify-center'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54302 C.P <br /> Suite 450, Delhi, India</p>
          <p className='text-gray-500'>Tel: (+91) 555-777-2233 <br /> Email: admin@forever.com</p>
          <p className='font-semibold text-xl'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>

      <div className='pt-16'>
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Contact