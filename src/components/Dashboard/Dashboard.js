// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import WorldMap from '../WorldMap/WorldMap';
import data from '../../data/communityData.json';

const Dashboard = () => {
  const [communitiesData, setCommunitiesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(data)

        setCommunitiesData(data.communities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <WorldMap communitiesData={communitiesData}/>
    </div>
  );
};

export default Dashboard;
