import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes later (e.g., /clients, /projects) */}
      </Routes>
    </div>
  );
}

export default App;