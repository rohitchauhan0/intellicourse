import React from 'react'
import Navbar from './_components/Navbar'
import Image from 'next/image'
import CTAbutton from './_components/CTAbutton'
import * as motion from "framer-motion/client"

const Page = () => {
  return (
    <div className=' w-full min-h-screen'>
        <Navbar />

        <div className=' max-w-screen-xl mx-auto flex items-center justify-between min-h-screen'>
            <div  className=' w-1/2 flex  justify-center flex-col space-y-7'>
                <h1 className=' text-7xl font-bold px-8'><span className='text-yellow-400'>Take your time</span> and learn from anywhere</h1>
                <p className=' px-8 text-gray-500 flex '>Transform your educational journey with our smart education platform, harnessing the power of AI to deliver personalized learning experiences, real-time feedback, and interactive tools designed to inspire and engage students.</p>

                <div className=' px-10'>
                <CTAbutton text='Get Started' />
                </div>

            </div>

            <div className=' w-1/2 flex justify-center relative'>
                <Image src='/home.png' width={500} height={500} alt='hero' />
             <motion.div initial={{ x: 0 , y:0 }} transition={{ duration: 1.5 }} whileInView={{ x: 500 , y: -500 }}
         className=' absolute bottom-0 left-0 z-30'>
             <Image src='/aeroplane.png' width={500} height={500} alt='hero' className=' h-20 w-20' />
             </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Page