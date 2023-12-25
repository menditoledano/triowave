import React, { useRef, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './DataVisualization.css';

const DataVisualization = ({ community, onClose }) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chart');

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderChartTab = () => {
    const attributeColors = generateAttributeColors(community.attributes);

    const chartData = {
      series: [
        {
          data: Object.entries(community.attributes).map(([attributeName, value], index) => ({
            x: attributeName,
            y: value * 100,
            fillColor: attributeColors[attributeName] || attributeColors.default,
            index,
          })),
        },
      ],
    };

    const chartOptions = {
      chart: {
        events: {
          click: (event, chartContext, config) => {
            const clickedAttribute = Object.entries(community.attributes)[config.dataPointIndex];
            if (clickedAttribute) {
              console.log({ name: clickedAttribute[0], value: clickedAttribute[1] });
              // handleAttributeClick({ name: clickedAttribute[0], value: clickedAttribute[1] });
            }
          },
        },
      },
      legend: { show: false },
      tooltip: { x: { show: false }, y: { title: { formatter: () => '' } } },
      plotOptions: { treemap: { distributed: true, enableShades: false } },
    };

    return (
      <div>
        <ReactApexChart options={chartOptions} series={chartData.series} type="treemap" />
      </div>
    );
  };

  const renderDataSourceTab = () => {
    // Assuming community.dataSources is an array of data sources for the community
    const dataSources = community.dataSources || [];

    return (
      <div>
        <ul>
          {dataSources.map((source, index) => (
            <li key={index}>
              <a href={source.link} target="_blank" rel="noopener noreferrer">
                {source.name} - <b>{source.size}</b>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="data-visualization-container" ref={modalRef}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        { community && <h3 className="data-visualization-header">{community.name}</h3>}
        { community.size && <h4 className="data-visualization-header">{community.size.toLocaleString()} Population</h4> }

        <div className="tab-container">
          <div className={`tab ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => handleTabChange('chart')}>
            Chart
          </div>
          <div className={`tab ${activeTab === 'dataSource' ? 'active' : ''}`} onClick={() => handleTabChange('dataSource')}>
            Data Sources
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'chart' ? renderChartTab() : renderDataSourceTab()}
        </div>
      </div>
    </div>
  );
};

const generateAttributeColors = (attributes) => {
  const uniqueAttributes = Object.keys(attributes);

  return uniqueAttributes.reduce((colors, attributeName, index) => {
    colors[attributeName] = getColorByIndex(index);
    return colors;
  }, {});

  function getColorByIndex(index) {
    const colorScheme = [
      '#003f5c', '#2f4b7c', '#665191', '#a05195',
      '#d45087', '#f95d6a', '#ff7c43', '#ffa600'
    ];

    return colorScheme[index % colorScheme.length];
  }
};

export default DataVisualization;
