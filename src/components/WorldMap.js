// src/components/WorldMap.js
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import DataVisualization from './DataVisualization';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './WorldMap.css'; // Import additional CSS for WorldMap

const WorldMap = () => {
  const [geoJSONData, setGeoJSONData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/world.geojson'); // Adjust the path based on your project structure
        const data = await response.json();
        setGeoJSONData(data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (country) => {
    setSelectedCountry(country);
  };

  const handlePopupClick = () => {
    // Open DataVisualization when the popup content is clicked
    setSelectedCountry('Netherlands');
  };

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.addEventListener('click', handlePopupClick);
    }

    return () => {
      if (popupRef.current) {
        popupRef.current.removeEventListener('click', handlePopupClick);
      }
    };
  }, []);

  return (
    <div>
      <MapContainer center={[52.3784, 4.8999]} zoom={6} style={{ height: '400px', width: '800px', zIndex:0 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">TrioWave</a> contributors'
        />
        {geoJSONData && <GeoJSON data={geoJSONData} />}
        <Marker position={[52.3784, 4.8999]}>
          <Popup ref={popupRef} className="popup-container">
            <div onClick={handlePopupClick}>
              <h4>Netherlands</h4>
              <p>Population: 17 million</p>
              <p>Capital: Amsterdam</p>
              <p>Official Language: Dutch</p>
              {/* Add more data points as needed */}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      {selectedCountry && <DataVisualization selectedCountry={selectedCountry} />}
    </div>
  );
};

export default WorldMap;


