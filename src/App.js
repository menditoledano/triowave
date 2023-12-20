// src/App.js
import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="app-container">
      <header>
        <img src="/trioWaveLogo.png" alt="Your Logo" className="app-logo" />
      </header>
      <main>
        <h1>TrioWave</h1>
        <p className="slogan">Where Exploration Meets Insight</p>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
