import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/nav' element={<Navbar />}/>
          <Route path="*" component={NotFound} />
        </Routes>
    </Router>
  );
};

export default App;