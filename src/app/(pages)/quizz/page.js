"use client"
import Navbar from '@/app/_components/Navbar'
import { db } from '@/config/DB'
import { quizzModel } from '@/config/Schema'
import { desc, eq } from 'drizzle-orm'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [quizz, setquizz] = useState([])
    const {data:session} = useSession()
    useEffect(() => {
        const getAdminQuizz = async()=>{
            try {
                const response = await db
                .select()
                .from(quizzModel)
                .where(eq(quizzModel.role, 'admin'))
                .orderBy(desc(quizzModel.createdAt));
              
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        getAdminQuizz()
    }, [session])
    
  return (
    <>
    <Navbar/>
    </>
  )
}

export default Page