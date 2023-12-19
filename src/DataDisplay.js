// src/DataDisplay.js
import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
};

export default DataDisplay;
