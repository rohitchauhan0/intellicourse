import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const CTAbutton = ({text}) => {
  return (
    <button className=' bg-gradient-to-r from-yellow-500 to-green-500 text-white px-4 py-3 rounded-full  hover:scale-105 duration-300 w-fit flex items-center gap-2  relative'>
      <div className=" w-[80px] h-[150px] bg-white -top-2 -left-2 rotate-45 absolute -skew-x-[5deg] opacity-40 animateButton"></div>
      {text} <IoIosArrowForward  className=' text-white'/>
    </button>
  )
}

export default CTAbutton