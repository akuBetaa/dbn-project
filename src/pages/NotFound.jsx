import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
