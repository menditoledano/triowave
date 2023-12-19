// src/components/DataVisualization.js
import React, { useState, useRef, useEffect } from 'react';
import './DataVisualization.css'; // Import the CSS file

const DataVisualization = ({ selectedCountry }) => {
  const demographicData = {
    Netherlands: {
      Evangelists: {
        Count: 150000, // Replace with actual data
        Interests: ['Faith', 'Community', 'Outreach'], // Replace with actual data
      },
      Jews: {
        Count: 50000, // Replace with actual data
        Interests: ['Culture', 'Tradition', 'History'], // Replace with actual data
      },
    },
    // Add data for other countries if necessary
  };

  const [activeDemographic, setActiveDemographic] = useState(null);
  const modalRef = useRef(null);
  const countryData = demographicData[selectedCountry] || {};
  const showInterests = activeDemographic !== null;

  const handleDemographicClick = (demographic) => {
    setActiveDemographic(demographic);
  };

  const handleCloseModal = () => {
    setActiveDemographic(null);
  };

  // Close the modal if clicked outside of it
  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutsideModal);
    
    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="data-visualization-container">
      <h3 className="data-visualization-header">{selectedCountry}</h3>
      <div className="data-point" onClick={() => handleDemographicClick('Evangelists')}>
        <strong>Evangelists:</strong> {countryData.Evangelists?.Count || 0}
      </div>
      {showInterests && (
        <div className="interests-modal" ref={modalRef}>
          <div className="modal-content modal-card">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{activeDemographic}</h2>
            <div className="modal-card">
              <strong>Interests:</strong>
              <ul>
                {countryData[activeDemographic]?.Interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="data-point" onClick={() => handleDemographicClick('Jews')}>
        <strong>Jews:</strong> {countryData.Jews?.Count || 0}
      </div>
    </div>
  );
};

export default DataVisualization;
