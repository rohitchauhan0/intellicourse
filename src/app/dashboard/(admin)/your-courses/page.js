"use client"
import { db } from '@/config/DB'
import { CourseList } from '@/config/Schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/Course_card'

const Page = () => {
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
      <h1>Admin Courses</h1>
    {
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {courseContent?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

    }
    </div>
  )
}

export default Page