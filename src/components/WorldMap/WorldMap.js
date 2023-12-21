// src/components/WorldMap.js
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import DataVisualization from '../DataVisualization/DataVisualization';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './WorldMap.css'; // Import additional CSS for WorldMap

const WorldMap = ({ countriesData, selectedCountry, selectedCity }) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13); // Initial zoom level
  const mapRef = useRef();
  const popupRef = useRef(null);

  const handleMarkerClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleCloseModal = () => {
    setSelectedCommunity(null);
  };

  const MapUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      if (selectedCountry) {
        const firstCommunity = selectedCountry.value.cities[0].communities[0];
        map.flyTo([firstCommunity.coordinates.latitude, firstCommunity.coordinates.longitude], zoomLevel);
      } else if (selectedCity) {
        const firstCommunity = selectedCity.value.communities[0];
        map.flyTo([firstCommunity.coordinates.latitude, firstCommunity.coordinates.longitude], zoomLevel);
      }
    }, [selectedCountry, selectedCity, zoomLevel, map]);

    return null;
  };

  return (
    <div className="world-map-container">
      <MapContainer
        center={[52.3784, 4.8999]}
        zoom={zoomLevel}
        style={{ height: '95vh', width: '100%', zIndex: 0 }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">TrioWave</a> contributors'
        />
        {countriesData.map((country) =>
          country.cities.map((city) =>
            city.communities.map((community) => (
              <CircleMarker
                key={community.name}
                center={[community.coordinates.latitude, community.coordinates.longitude]}
                radius={Math.sqrt(community.size) * 0.15}
                eventHandlers={{ click: () => handleMarkerClick(community) }}
              >
                <Popup>{community.name}</Popup>
                <Tooltip>{community.name}</Tooltip>
              </CircleMarker>
            ))
          )
        )}
        <MapUpdater />
      </MapContainer>
      {selectedCommunity && <DataVisualization community={selectedCommunity} onClose={handleCloseModal} />}
    </div>
  );
};

export default WorldMap;
