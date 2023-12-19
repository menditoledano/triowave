// src/App.js
import React from 'react';
import WorldMap from './components/WorldMap';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <div>
          <img src="/trioWaveLogo.png" alt="Your Logo" className="app-logo" />
          <h1>TrioWave</h1>
          <p className="slogan">Where Exploration Meets Insight</p>
        </div>
      </header>
      <WorldMap />
    </div>
  );
}

export default App;
