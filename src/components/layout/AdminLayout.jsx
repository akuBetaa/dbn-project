import React from 'react';
import Sidebar from '@/components/Sidebar';

const AdminLayout = ({ children, title, ...props }) => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen max-h-screen'>
      <div className='md:w-1/6 bg-gray-100 border-e'>
        <Sidebar />
      </div>
      <div className='md:w-5/6 flex flex-col mt-3'>
        <div className='w-full p-5 px-10 hidden md:flex justify-between'>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          <p>Header Content</p>
        </div>
        <div className='flex-1 overflow-y-auto p-5'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
