import React from "react";
import AdminLayout from "@/templates/AdminLayout";
import ListMembers from "@/components/ListMembers";

const MemberPage = () => {
  return (
    <AdminLayout>
      <div className='container mt-10 grid grid-cols-1 gap-4'>
        <div>
            <h1 className="text-xl font-semibold">Data Pelanggan DBN - Kamil</h1>
        </div>
        <div className="border border-border rounded-md p-5">
          <ListMembers />
        </div>
      </div>
    </AdminLayout>
  );
};

export default MemberPage;
