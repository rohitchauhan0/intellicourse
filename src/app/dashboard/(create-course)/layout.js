import React from 'react'


const DashboardLayout = ({children}) => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {children}
    </div>
  )
}

export default DashboardLayout
