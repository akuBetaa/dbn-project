import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import ComplaintPage from '@/pages/ComplaintPage';
import CheckComplaintPage from '@/pages/CheckComplaintPage';
import MemberPage from '@/pages/admin/MemberPage';
import ListComplaintPage from '@/pages/admin/ListComplaintPage';
import Dashboard from '@/pages/admin/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import ShowMembers from '@/components/ShowMembers';
import UserPage from '@/pages/UserPage';

import { jwtDecode } from 'jwt-decode';
import Register from '@/components/Register';
import AuthPage from '@/pages/AuthPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/layanan-pengaduan' element={<ComplaintPage />} />
        <Route path='/cek-pengaduan' element={<CheckComplaintPage />} />
        <Route path='/admin' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/admin/list-pelanggan' element={
          <ProtectedRoute>
            <MemberPage />
          </ProtectedRoute>
        } />
        <Route path='/admin/list-pengaduan' element={
          <ProtectedRoute>
            <ListComplaintPage />
          </ProtectedRoute>
        } />
        <Route path="/user" element={<UserRedirect />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="*" element={<NotFound message="Halaman Tidak Ditemukan" />} />
        <Route path='/coba' element={ <Register /> } />
        <Route path='/coba2' element={ <AuthPage /> } />
      </Routes>
    </Router>
  );
};

const UserRedirect = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return <Navigate to={`/user/${decoded.id}`} />;
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
