import ShowMembers from '@/components/ShowMembers'
import AdminLayout from '@/components/layout/AdminLayout'
import React from 'react'

const ShowMemberPage = () => {
  return (
    <AdminLayout title="Data Pelanggan">
        <ShowMembers></ShowMembers>
    </AdminLayout>
  )
}

export default ShowMemberPage