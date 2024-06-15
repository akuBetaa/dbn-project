import CheckProgress from "@/components/CheckProgress";
import UserLayout from "@/components/layout/UserLayout";
import React from "react";

const CheckComplaintPage = () => {
  return (
    <UserLayout>
      <div className="container pt-5">
        <div className="text-center pb-5">
          <h1 className="text-2xl font-semibold">Cek Status Pengaduan</h1>
          <p className="text-xs md:text-base md:pt-3 ">
            Masukkan token pengaduan Anda untuk melihat status terkini dari
            pengaduan yang telah Anda ajukan.
          </p>
        </div>
        <div className="flex justify-center">
          <CheckProgress />
        </div>
      </div>
    </UserLayout>
  );
};

export default CheckComplaintPage;
