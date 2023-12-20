// src/components/DataVisualization.js
// src/components/DataVisualization.js
import React, { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow left icon
import './DataVisualization.css';

const DataVisualization = ({ community, onClose }) => {
  const [activeAttribute, setActiveAttribute] = useState(null);
  const modalRef = useRef(null);
  const interestsModalRef = useRef(null);

  const handleAttributeClick = (attribute) => {
    setActiveAttribute(attribute);
  };

  const handleCloseModal = () => {
    setActiveAttribute(null);
    onClose();
  };

  const handleCloseInterestsModal = () => {
    setActiveAttribute(null);
  };

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
    document.addEventListener('mousedown', (event) => handleClickOutsideModal(event, modalRef));

    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutsideModal(event, modalRef));
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutsideModal(event, interestsModalRef));

    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutsideModal(event, interestsModalRef));
    };
  }, []);

  const chartData = {
    series: [
      {
        data: community.attributes.map((attribute, index) => ({
          x: attribute.name,
          y: attribute.value * 100,
          fillColor: getCircleColor(attribute.name),
          index,
        })),
      },
    ],
  };

  const chartOptions = {
    chart: {
      events: {
        click: function (event, chartContext, config) {
          const clickedAttribute = community.attributes[config.dataPointIndex];
          if (clickedAttribute) {
            handleAttributeClick(clickedAttribute);
          }
        },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: (seriesName) => '',
        },
      },
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };

  const chartStyle = {
    width: '100%',
    height: '80vh',
  };

  return (
    <div className="data-visualization-container" ref={modalRef}>
      <div className="modal-content">
        
        <h2 className="data-visualization-header">{community.name}</h2>
        <h4 className="data-visualization-header">{community.size.toLocaleString()} Population</h4>
        <button className="back-button" onClick={handleCloseModal}>
          <FaArrowLeft />
        </button>
        <ReactApexChart options={chartOptions} series={chartData.series} type="treemap" style={chartStyle} />
      </div>
      {activeAttribute && (
        <div className="interests-modal" ref={interestsModalRef}>
          <div className="modal-content modal-card">
            <button className="back-button" onClick={handleCloseInterestsModal}>
              <FaArrowLeft />
            </button>
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
  'Israel Support': '#536DFE',
  'Food Enthusiasts': '#FF8A65',
  'Religious Attendees': '#9FA8DA',
  'Cultural Events': '#FF4081',
  'Education Level': '#3F51B5',
  'Median Income': '#8BC34A',
  'Population': '#FF5252',
  'Cultural Diversity': '#009688',
  'Outreach Programs': '#00E676',
  // Add more cases as needed
  default: '#B0BEC5', // Default color
};

const getCircleColor = (attributeName) => attributeColors[attributeName] || attributeColors.default;

export default DataVisualization;
