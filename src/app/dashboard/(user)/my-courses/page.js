"use client"
import CourseCardFree from '@/app/(pages)/courses/_components/Course_card'
import CourseCard from '@/app/dashboard/(admin)/_components/Course_card'
import { db } from '@/config/DB'
import { CourseList } from '@/config/Schema'
import { eq } from 'drizzle-orm'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'


const FreeCourse = () => {
    const [courseContent, setcourseContent] = useState([])
    const [loading, setloading] = useState(false)
    const {data:session} = useSession()

    useEffect(() => {

        const getCourseContent = async () => {
            setloading(true)
            try {
                const response = await db.select().from(CourseList).where(eq(CourseList?.createdBy, session?.user?.email))
                console.log(response)
                setcourseContent(response)
            } catch (error) {
                console.log(error)
            }
            setloading(false)
        }
        
        getCourseContent()
    },[session])

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