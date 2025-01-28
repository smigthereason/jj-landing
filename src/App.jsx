import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Offer from './Offer';
import LandingPage from './LandingPage';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
