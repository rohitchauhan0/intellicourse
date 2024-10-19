"use client"
import { db } from '@/config/DB'
import { quizzModel } from '@/config/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import Quizzcard from '../_components/Quizz_card'

const Page = () => {
    const [quizz, setquizz] = useState([])
    const getQuizz = async () => {
        try {
            const response = await db.select().from(quizzModel).where(eq(quizzModel?.role, 'admin'))
            console.log(response)
            setquizz(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getQuizz()
    },[])
  return (
    <div>
        <h1 className=' text-5xl font-semibold text-center my-5'>Your Quizzes</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">

        {quizz?.map((quizz, index) => (
          <Quizzcard key={index} quizz={quizz} />
        ))}
      </div>
    </div>
  )
}

export default Page