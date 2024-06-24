import React from 'react'


const Layout = ({ children, ...props }) => {
  return (
    <div className="container px-14 p-4" {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" {...props}>
        {children}
      </div>
    </div>
  );
};

// LeftContent component
const LeftContent = ({ children, ...props }) => {
  return (
    <div className=" p-4" {...props}>
      {children}
    </div>
  );
};

// RightContent component
const RightContent = ({ children, ...props }) => {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
};


export { Layout, LeftContent, RightContent };