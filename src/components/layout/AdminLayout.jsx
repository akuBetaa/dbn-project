import React, { useState, useEffect} from 'react';
import Sidebar from '@/components/Sidebar';
import AvatarProfile from "@/components/AvatarProfile";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children, title, ...props }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        console.log('Decoded token:', decodedToken);
        setUser({
          id: decodedToken.id ?? "",
          name: decodedToken.name ?? "",
          role: decodedToken.role ?? "",
        });
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
    console.log("yey berhasil logout")
    setUser(null); 
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen max-h-screen'>
      <div className='md:w-1/6 bg-gray-100 border-e'>
        <Sidebar />
      </div>
      <div className='md:w-5/6 flex flex-col mt-3'>
        <div className='w-full p-5 px-10 hidden md:flex justify-between'>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          {user && (
            <AvatarProfile name={user.name} role={user.role} imageUrl={user.imageUrl} onLogout={logout} />
          )}
        </div>
        <div className='flex-1 overflow-y-auto p-5'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
