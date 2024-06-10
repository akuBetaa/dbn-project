import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import FormComplaint from '@/components/FormComplaint'

const ComplaintPage = () => {
  return (
    <div>
         <div className="flex justify-center mt-10">
        <FormComplaint />
        <Toaster />
      </div>
    </div>
  )
}

export default ComplaintPage