// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import WorldMap from '../WorldMap/WorldMap';
import data from '../../data/communityData.json';
import Select from 'react-select';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [communitiesData, setCommunitiesData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCommunitiesData(data.communities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterOptions = [
    // Define your filter options based on your data
    { value: 'Israel Support', label: 'Israel Support' },
    { value: 'Food Enthusiasts', label: 'Food Enthusiasts' },
    { value: 'Religious Attendees', label: 'Religious Attendees' },
    // Add more options as needed
  ];

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
    // You can apply filtering logic based on selected filters
    // For simplicity, we are just updating the state here
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>TrioWave</h1>
        <p className="slogan">Where Exploration Meets Insight</p>
        <Select
          options={filterOptions}
          isMulti
          value={selectedFilters}
          onChange={handleFilterChange}
          placeholder="Select filters..."
          className="filter-dropdown"
        />
      </header>
      <main>
        <WorldMap communitiesData={communitiesData} />
      </main>
    </div>
  );
};

export default Dashboard;
