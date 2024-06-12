import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ComplaintPage from './pages/ComplaintPage';
import CheckComplaintPage from '@/pages/CheckComplaintPage';
import MemberPage from './pages/MemberPage';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/layanan-pengaduan' element={<ComplaintPage />} />
          <Route path='/cek-pengaduan' element={<CheckComplaintPage/>}/>
          <Route path='/admin/list-pelanggan' element={<MemberPage />}/>
          <Route path="*" element={<NotFound />} />
          {/* <Route path='/coba' element={<TableMembers />}/> */}
        </Routes>
    </Router>
  );
};

export default App;