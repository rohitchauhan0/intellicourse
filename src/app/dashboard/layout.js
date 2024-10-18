import React from 'react'
import Sidebar from './_components/Sidebar'

const Layout = ({children}) => {
  return (
    <div>
         <div className='flex'>
        <Sidebar/>
        <div className='w-full bg-dark-black overflow-y-scroll py-20 px-8 h-screen '>
            {/* <Dashboardnav/> */}
            {children}
        </div>
    </div>
    </div>
  )
}

export default Layout