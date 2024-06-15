import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ListMembers from "@/components/ListMembers";

const MemberPage = () => {
  return (
    <AdminLayout title="Data Pelanggan">
      <div className='container grid grid-cols-1 gap-4'>
        {/* <div>
            <h1 className="text-xl font-semibold">Data Pelanggan DBN - Kamil</h1>
        </div> */}
        <div className="border border-border rounded-md p-5">
          <ListMembers />
        </div>
      </div>
    </AdminLayout>
  );
};

export default MemberPage;
