import React from "react";
import { Toaster } from "@/components/ui/toaster";
import FormComplaint from "@/components/FormComplaint";
import UserLayout from "@/templates/UserLayout";

const ComplaintPage = () => {
  return (
    <>
      <UserLayout>
        <div className="py-5">
          <div className="container text-center">
            <h1 className="text-2xl font-semibold">Ajukan Pengaduan Anda</h1>
            <p className="text-xs md:text-base md:pt-3 ">
              Sampaikan keluhan atau masalah yang Anda hadapi melalui form ini.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <FormComplaint />
          <Toaster />
        </div>
      </UserLayout>
    </>
  );
};

export default ComplaintPage;
