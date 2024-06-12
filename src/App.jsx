import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ComplaintPage from './pages/ComplaintPage';
import CheckComplaintPage from '@/pages/CheckComplaintPage';
import Coba from '@/pages/Coba';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/layanan-pengaduan' element={<ComplaintPage />} />
          <Route path='/cek-pengaduan' element={<CheckComplaintPage/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path='/coba' element={<Coba />}/>
        </Routes>
    </Router>
  );
};

export default App;