import Navbar from '@/app/_components/Navbar'
import Image from 'next/image'
import React from 'react'
import * as motion from "framer-motion/client"
import Card from './_components/Card'


const Page = () => {
    return (
        <>
            <Navbar />

            <div className=' w-full  '>
                <div className=' max-w-screen-xl mx-auto min-h-screen flex items-center justify-between px-10 relative '>

                    <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ duration: 0.5 }} className=' h-96 w-96  rounded-full blur-lg bg-emerald-300 opacity-50 absolute -left-32 top-20 -z-20 animate-pulse'> </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ duration: 0.5 }} className=' h-72 w-72  rounded-full blur-lg bg-yellow-300 opacity-50 absolute -right-32 bottom-20 -z-20 animate-pulse'> </motion.div>

                    <div className=' w-1/2'>
                        <Image src="/girl.png" alt="hero" width={1000} height={1000} className=' h-[60vh] w-[50vw] object-cover' />
                    </div>

                    <div className=' w-1/2 flex flex-col items-center space-y-3 py-10'>
                        <h1 className=' text-6xl font-bold text-center'>Welcome to
                            <span className=' text-yellow-500 '> {" "} AI</span> Learning center</h1>

                        <p className=' text-[17px] text-gray-500 text-center pt-8'>
                            Welcome to the AI Learning Center, where innovation meets education. Unlock your potential with hands-on courses, expert guidance, and a vibrant community to help you master artificial intelligence.</p>
                            <Image src="/book.gif" alt="hero" width={1000} height={1000} className=' h-20 w-20 ' />
                    </div>
                </div>


              <div className=' max-w-screen-xl mx-auto  relative'>
              <div className='grid grid-cols-3 space-x-9 absolute -top-14 w-full '>
                    <Card title={"AI generated"} icon={"/ai.gif"} desc={"Join our AI Generation course to learn cutting-edge techniques, hands-on projects, and real-world applications to excel in artificial intelligence."}/>
                    <Card title={"Easy to understand"} icon={"/easy.gif"} desc={"Enroll in our AI Generation course to learn simple, practical techniques and hands-on projects that make artificial intelligence easy and accessible for everyone."}/>
                    <Card title={"Mind development"} icon={"/brain.gif"} desc={"Unlock your potential with our Mind Development course, designed to enhance cognitive skills, boost creativity, and foster personal growth through engaging techniques and exercises."}/>
                </div>
              </div>
            </div>  
        </>
    )
}

export default Page