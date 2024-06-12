import React from 'react'
import Sidebar from '@/components/Sidebar'

const AdminLayout = ( { children, ...props }) => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen max-h-screen'>
      <div className='w-1/6 bg-gray-100'><Sidebar /></div>
      <div className='w-5/6'>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout;