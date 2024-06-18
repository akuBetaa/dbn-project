import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import ListComplaint from "@/components/ListComplaint";

const ListComplaintPage = () => {
  return (
    <AdminLayout title="List Aduan Pelanggan">
      <div className='container grid grid-cols-1 gap-4'>
        {/* <div>
            <h1 className="text-xl font-semibold">List Aduan Pelanggan</h1>
        </div> */}
        <div className="border border-border rounded-md p-5">
          <ListComplaint />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListComplaintPage;
