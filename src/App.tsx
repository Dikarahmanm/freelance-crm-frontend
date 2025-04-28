import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Clients from './pages/Clients';

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        {/* Add more routes later (e.g., /projects, /invoices) */}
      </Route>
    </Routes>
  );
}

export default App;