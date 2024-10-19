import Image from 'next/image'
import React from 'react'

const Card = ({icon, title, desc}) => {
  return (
    <div className=' flex flex-col space-y-3 border border-gray-400 rounded-xl p-3 items-center'>
        <Image src={icon} alt="icon" width={90} height={90} className='' />
        <h3 className='text-2xl font-bold'>{title}</h3>
        <p className='text-sm text-gray-400 text-center'>{desc}</p>
    </div>
  )
}

export default Card