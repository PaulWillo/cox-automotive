import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VehicleList from './components/VehicleListDashboard';
import VehicleDetails from './components/VehicleDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
      <Route path="/vehicles/:id" element={<VehicleDetails />} />
    </Routes>
  );
};

export default App;
