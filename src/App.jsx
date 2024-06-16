import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import ComplaintPage from '@/pages/ComplaintPage';
import CheckComplaintPage from '@/pages/CheckComplaintPage';
import MemberPage from '@/pages/admin/MemberPage';
import ListComplaintPage from '@/pages/admin/ListComlaintPage';
import Dashboard from '@/pages/admin/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import ShowMembers from '@/components/ShowMembers';
import ShowMemberPage from '@/pages/admin/ShowMemberPage';

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
        <Route path='/user/:id' element={
          <ShowMemberPage />
        } />
        <Route path="*" element={<NotFound message="Halaman Tidak Ditemukan" />} />
        <Route path='/coba' element={<ShowMembers />} />
      </Routes>
    </Router>
  );
};

export default App;
