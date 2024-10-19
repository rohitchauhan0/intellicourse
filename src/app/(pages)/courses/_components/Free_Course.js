"use client"
import CourseCard from '@/app/dashboard/(admin)/_components/Course_card'
import { db } from '@/config/DB'
import { CourseList } from '@/config/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCardFree from './Course_card'

const FreeCourse = () => {
    const [courseContent, setcourseContent] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {

        const getCourseContent = async () => {
            setloading(true)
            try {
                const response = await db.select().from(CourseList).where(eq(CourseList?.role, 'admin'))
                setcourseContent(response)
            } catch (error) {
                console.log(error)
            }
            setloading(false)
        }
        
        getCourseContent()
    },[])

  return (
    <div>
    {
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {courseContent?.map((course, index) => (
          <CourseCardFree key={index} course={course} />
        ))}
      </div>

    }
    </div>
  )
}

export default FreeCourse