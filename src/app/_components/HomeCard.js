import React from 'react'
import * as motion from "framer-motion/client"


const HomeCard = ({title, desc, xPos, yPos, bordercolor}) => {
  return (
    <motion.div 
    initial={{ x: 0, y: 0 }} 
    whileInView={{ x: xPos, y: yPos }} 
    transition={{ duration: 1 }} 
    className={`absolute border-2 ${bordercolor} rounded-xl p-4 flex flex-col items-center space-y-2 w-80`} 
    whileHover={{ scale: 1.05 }} // Optional hover effect
    viewport={{ once: true }} // Animate only once when in view
>
    <h2 className='text-center text-3xl'>{title}</h2>
    <p className='text-sm text-gray-400'>{desc}</p>
</motion.div>

  )
}

export default HomeCard