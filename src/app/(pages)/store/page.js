import CoinsCard from '@/app/_components/CoinsCard'
import Navbar from '@/app/_components/Navbar'
import { COINS } from '@/data/coins'
import React from 'react'

const Page = () => {
  return (
   <>
   <Navbar/>

   <div className=' w-full'>

    <div className=' max-w-screen-xl mx-auto min-h-screen relative py-32 flex items-center justify-center w-full'>
        <div className=' h-96 w-96 rounded-full bg-yellow-200 blur-xl absolute top-0 right-[40%] animate-pulse -z-10'></div>
        <div className=' h-64 w-64 rounded-full bg-red-200 blur-xl absolute right-[30%] bottom-[10%] -z-10'></div>
        <div className=' h-64 w-64 rounded-full bg-blue-200 blur-xl absolute -bottom-[20%] left-[30%] -z-10'></div>
        <div className=' h-64 w-64 rounded-full bg-pink-200 blur-xl absolute left-[10%] bottom-[10%] -z-10'></div>
        <div className=' h-64 w-64 rounded-full bg-green-200 blur-xl absolute right-[20%] -z-10'></div>

        <div className=' grid grid-cols-3  gap-36'>
            {
                COINS.map((coin)=>{
                    return <CoinsCard data={coin} key={coin.id}/>
                }
                   
                )
            }

        </div>
    </div>
   
   </div>

   </>
  )
}

export default Page