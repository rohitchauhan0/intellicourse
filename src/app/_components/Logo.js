import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className=' flex items-center space-x-1' >
      <div className=' border-2 border-yellow-300 rounded-full p-0.5'>

<Image src={"/logo.jpeg"} width={400} height={400} className=' h-14 w-14 rounded-full object-cover'/>
      </div>
<h2 className=' font-semibold bg-gradient-to-r from-yellow-500 to-emerald-500 bg-clip-text text-transparent text-xl
 ' >Intelli<span>C</span>ourse</h2>
    </Link>
  )
}

export default Logo