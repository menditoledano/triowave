// src/components/Dashboard.js
import React from 'react';
import WorldMap from './WorldMap';
import DataVisualization from './DataVisualization';

const Dashboard = () => {
  return (
    <div>
      <WorldMap />
      <DataVisualization />
    </div>
  );
};

export default Dashboard;
