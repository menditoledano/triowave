// src/components/DataVisualization.js
import React, { useState, useRef, useEffect } from 'react';
import './DataVisualization.css'; // Import the CSS file

const DataVisualization = ({ community, onClose }) => {
  const [activeAttribute, setActiveAttribute] = useState(null);
  const modalRef = useRef(null);
  const interestsModalRef = useRef(null);

  const handleAttributeClick = (attribute) => {
    setActiveAttribute(attribute);
  };

  const handleCloseModal = () => {
    setActiveAttribute(null);
    onClose(); // Call the onClose prop to close the modal
  };

  const handleCloseInterestsModal = () => {
    setActiveAttribute(null);
  };

  // Close the modal if clicked outside of it
  const handleClickOutsideModal = (event, modalRef) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      if (modalRef === interestsModalRef) {
        handleCloseInterestsModal();
      } else {
        handleCloseModal();
      }
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', (event) => handleClickOutsideModal(event, modalRef));

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutsideModal(event, modalRef));
    };
  }, []);

  useEffect(() => {
    // Attach the event listener for the interests-modal
    document.addEventListener('mousedown', (event) => handleClickOutsideModal(event, interestsModalRef));

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutsideModal(event, interestsModalRef));
    };
  }, []);

  const totalValue = community.attributes.reduce((sum, attribute) => sum + attribute.value, 0);
  const scalingFactor = totalValue > 0 ? 100 / totalValue : 0;

  return (
    <div className="data-visualization-container" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2 className="data-visualization-header">{community.name}</h2>
        <h4 className="data-visualization-header">{community.size.toLocaleString()} Population</h4>

        <div className="circle-container">
          {community.attributes.map((attribute) => (
            <div
              key={attribute.name}
              className="interest-circle"
              onClick={() => handleAttributeClick(attribute)}
              style={{
                width: `${attribute.value * scalingFactor}vw`,
                height: `${attribute.value * scalingFactor}vh`,
                backgroundColor: getCircleColor(attribute.name),
              }}
            >
              <span style={{ fontSize: `${attribute.value * scalingFactor * 0.1}vw` }}>{attribute.name}</span>
            </div>
          ))}
        </div>
      </div>
      {activeAttribute && (
        <div className="interests-modal" ref={interestsModalRef}>
          <div className="modal-content modal-card">
            <span className="close" onClick={handleCloseInterestsModal}>
              &times;
            </span>
            <h2>{activeAttribute.name}</h2>
            <div className="modal-card">
              <strong>Value:</strong> {activeAttribute.value}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to get different colors based on attribute name
const attributeColors = {
  'Israel Support': 'green',
  'Food Enthusiasts': 'orange',
  'Religious Attendees': 'purple',
  'Cultural Events': 'pink',
  'Education Level': 'blue',
  'Median Income': 'gold',
  'Population': 'red',
  'Cultural Diversity': 'teal',
  'Outreach Programs': 'lime',
  // Add more cases as needed
  default: 'gray', // Default color
};

const getCircleColor = (attributeName) => attributeColors[attributeName] || attributeColors.default;

export default DataVisualization;
