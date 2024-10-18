"use client"
import Image from 'next/image'
import React from 'react'
import Logo from './Logo'
import { NAVBAR_LINK } from '@/data/NavbarLinks'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const Navbar = () => {
  const { data: session } = useSession();
  return (
  <div className=' w-full fixed top-0 z-[10000] '>
      <div className=' w-full max-w-screen-xl mx-auto '>
        <div className='flex items-center justify-between p-1 '>

     <div className='flex items-center space-x-10'>
        <Logo/>
      <div>
      {
        NAVBAR_LINK.map((link)=>
        <Link key={link.id} href={link.link} className='text-lg  cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-lg'>{link.name}</Link>)
      }
      </div>
     </div>
     {
      session ? <Link href={session?.user?.role == "user" ? "/dashboard/my-profile" : "/dashboard/admin"}>{
        session?.user?.picture ? <Image src={session?.user?.picture} alt="profile" width={40} height={40} className='rounded-full' /> : <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      
      }
        </Link> : <Link href="/login" className='text-lg  px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-500 text-white rounded-lg hover:scale-105 transition-all duration-200 '>Login</Link>
     }
        </div>
    </div>
  </div>
  )
}

export default Navbar