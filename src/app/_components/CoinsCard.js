"use client"
import { buyPlan } from '@/config/BuyCoin'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const CoinsCard = ({data}) => {
    const {data:session} = useSession()
    const router = useRouter()
  return (
    <div className=' w-40 h-40 rounded-full border border-gray-500 flex-col space-y-2 shadow-lg shadow-yellow-400 relative flex items-center justify-center '>
            <Image src={data?.imageURL} width={200} height={200} className=' h-44 w-44 object-contain absolute -top-20 -right-24'/>
            <p className=' font-semibold capitalize'>{data?.name}</p>
            <p className=' text-xs'>{data?.coins} coins</p>
            <button className=' px-2 py-1 bg-yellow-500 rounded-xl text-white'
            onClick={()=>{
                buyPlan({
                    coins:data?.coins,
                    price:data?.price,
                    email:session?.user?.email,
                    router
                })
            }}
            >Rs. {data?.price}</button>
    </div>
  )
}

export default CoinsCard