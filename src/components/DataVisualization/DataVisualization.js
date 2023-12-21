// src/components/DataVisualization.js
import React, { useState, useRef, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import './DataVisualization.css';

const DataVisualization = ({ country, city, community, onClose }) => {
  const [activeAttribute, setActiveAttribute] = useState(null);
  const modalRef = useRef(null);

  const handleAttributeClick = (attribute) => {
    setActiveAttribute(attribute);
  };

  const handleCloseModal = () => {
    setActiveAttribute(null);
    onClose(); // Call the onClose prop to close the modal
  };

  // Close the modal if clicked outside of it
  const handleClickOutsideModal = (event, modalRef) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
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

  const chartData = {
    series: [
      {
        data: Object.entries(community.attributes).map(([attributeName, value], index) => ({
          x: attributeName,
          y: value * 100, // Multiply by 100 to convert the ratio to percentage
          fillColor: getCircleColor(attributeName),
          index,
        })),
      },
    ],
  };

  const chartOptions = {
    chart: {
      events: {
        click: function (event, chartContext, config) {
          const clickedAttribute = Object.entries(community.attributes)[config.dataPointIndex];
          if (clickedAttribute) {
            handleAttributeClick({ name: clickedAttribute[0], value: clickedAttribute[1] });
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

  return (
    <div className="data-visualization-container" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h3 className="data-visualization-header">{community.name}</h3>
        <h4 className="data-visualization-header">{community.size.toLocaleString()} Population</h4>

        <ReactApexChart options={chartOptions} series={chartData.series} type="treemap"/>
      </div>
      {activeAttribute && (
        <div className="interests-modal" ref={modalRef}>
          <div className="modal-content modal-card">
            <span className="close" onClick={handleCloseModal}>
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

const attributeColors = {
  'Israel Opposition': '#536DFE',
  'Food Enthusiasts': '#FF8A65',
  'Religious Attendees': '#9FA8DA',
  'Cultural Diversity': '#009688',
  'Education Level': '#3F51B5',
  'Median Income': '#8BC34A',
  // Add more cases as needed
  default: '#B0BEC5', // Default color
};

const getCircleColor = (attributeName) => attributeColors[attributeName] || attributeColors.default;

export default DataVisualization;
