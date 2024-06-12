import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const UserLayout = ({ children, ...props }) => {
  return (
    <div className="min-h-screen flex flex-col" {...props}>
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
