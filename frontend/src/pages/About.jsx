import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-3xl text-center border-t pt-8'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 gap-16 flex flex-col md:flex-row'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit expedita tenetur esse vel dignissimos itaque nostrum dicta laudantium quis cupiditate veritatis nobis omnis delectus minima, nihil quia odit enim praesentium facilis aspernatur reiciendis consequatur blanditiis atque! In excepturi soluta dicta voluptate error, numquam eligendi libero. Eligendi fuga vel facere debitis!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vel ut temporibus voluptas ea sint ducimus quisquam, saepe vitae perspiciatis!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam aperiam quae laboriosam eos. Velit, quam unde incidunt qui consectetur veritatis nulla in culpa sunt blanditiis. Repellendus, earum voluptas quisquam quod, facilis tempora iure similique eum assumenda molestiae quae numquam perspiciatis?</p>
        </div>
      </div>

      <div className='text-2xl mt-10 pt-6'>
        <Title text1={'WHY TO'} text2={'CHOOSE US?'} />
      </div>
      
      <div className='pt-6 mb-20 flex flex-col md:flex-row text-sm gap-2'>
        <div className='flex flex-col border border-gray-300 px-18 py-8 md:px-18 sm:py-16 gap-5'>
          <b className='text-gray-600'>Quality Assurance:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ex assumenda hic reiciendis laborum, optio maxime dolore pariatur natus nostrum?</p>
        </div>
        <div className='flex flex-col border border-gray-300 px-18 py-8 md:px-18 sm:py-16 gap-5'>
          <b className='text-gray-600'>Convinence:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut omnis quis consectetur velit maxime laborum eos vitae reprehenderit delectus impedit?</p>
        </div>
        <div className='flex flex-col border border-gray-300 px-18 py-8 md:px-18 sm:py-16 gap-5'>
          <b className='text-gray-600'>Exceptional Customer Support:</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia voluptatum incidunt similique earum, ex atque, natus cum suscipit laudantium dolore molestiae architecto! Eos, illo illum!</p>
        </div>
      </div>

      <div>
        <NewsLetterBox />
      </div>

    </div>
  )
}

export default About