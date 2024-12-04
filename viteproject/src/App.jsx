import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gameover from './component/Gameover'; // Adjust path as needed
import Keyword from './component/keyword'; // Adjust path as needed
import Home from './component/Home';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/level1" element={<Keyword />} />
      <Route path="/gameover" element={<Gameover />} />
      </Routes>
    </Router>
  );
};

export default App;
