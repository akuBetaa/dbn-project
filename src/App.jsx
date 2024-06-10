import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import ComplaintPage from './pages/ComplaintPage';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/nav' element={<Navbar />}/>
          <Route path='/pengaduan'  element={<ComplaintPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
};

export default App;