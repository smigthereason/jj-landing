import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Offer from './components/Offer';
import LandingPage from './LandingPage';
import Footer from './components/Footer';

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
