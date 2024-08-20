import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';
import './App.css';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="/" element={<PhotoList />} />
      </Routes>
    </Router>
  );
};

export default App;
