import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import DataVisualization from '../DataVisualization/DataVisualization';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './WorldMap.css'; // Import additional CSS for WorldMap

const WorldMap = ({ communitiesData }) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(8); // Initial zoom level
  const popupRef = useRef(null);

  const handleMarkerClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleCloseModal = () => {
    setSelectedCommunity(null);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 1); // Increase zoom level
  };

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.addEventListener('click', handleCloseModal);
    }

    return () => {
      if (popupRef.current) {
        popupRef.current.removeEventListener('click', handleCloseModal);
      }
    };
  }, []);

  return (
    <div className="world-map-container">
      <div className="zoom-button-container">
        <button onClick={handleZoomIn}>Zoom In</button>
      </div>
      <MapContainer center={[52.3784, 4.8999]} zoom={zoomLevel} style={{ height: '100vh', width: '100%', zIndex: 0 }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">TrioWave</a> contributors'
        />
        {communitiesData.map((community) => (
          <CircleMarker
            key={community.name}
            center={[community.coordinates.latitude, community.coordinates.longitude]}
            radius={Math.sqrt(community.size) * 0.05} // Adjust the scaling factor as needed
            eventHandlers={{ click: () => handleMarkerClick(community) }}
          >
            <Popup>{community.name}</Popup>
            <Tooltip>{community.name}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      {selectedCommunity && <DataVisualization community={selectedCommunity} onClose={handleCloseModal} />}
    </div>
  );
};

export default WorldMap;