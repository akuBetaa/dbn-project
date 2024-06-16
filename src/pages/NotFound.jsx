import React from "react";
import { Link } from "react-router-dom";

const NotFound = ( { message } ) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Page not found</p>
      <p className="mb-4 text-xl">{message}</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Kembali Ke beranda
      </Link>
    </div>
  );
};

export default NotFound;
