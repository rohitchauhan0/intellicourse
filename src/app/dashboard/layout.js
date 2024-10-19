"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import { UserInputContext } from '../context/UserInputContext'

const Layout = ({children}) => {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <UserInputContext.Provider
    value={{
      userCourseInput,
      setUserCourseInput,
    }}
  >
    <div>
         <div className='flex'>
        <Sidebar/>
        <div className='w-full bg-dark-black overflow-y-scroll py-20 px-8 h-screen '>
            {/* <Dashboardnav/> */}
            {children}
        </div>
    </div>
    </div>
    </UserInputContext.Provider>

  )
}

export default Layout