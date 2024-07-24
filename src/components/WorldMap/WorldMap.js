import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, TileLayer, CircleMarker, Popup, Tooltip, useMap, Rectangle } from 'react-leaflet';
import DataVisualization from '../DataVisualization/DataVisualization';
import L from 'leaflet'; // Import Leaflet library

import 'leaflet/dist/leaflet.css';
import './WorldMap.css';

const WorldMap = ({
  countriesData,
  selectedCountry,
  selectedCity,
  selectedAttribute,
  selectedFilters,
  onCitySelect
}) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedCityData, setSelectedCityData] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(4.5);
  const mapRef = useRef();

  
  const infoIcon = new L.Icon({
    iconUrl: './marker-icon-2x.png', // Replace with the actual path to your SVG icon
    iconSize: [150 / zoomLevel,220 / zoomLevel],
  });

  const handleMarkerClick = (community) => {
    setSelectedCommunity(community);
  };

  const handleCityClick = (city, country) => {
    //setSelectedCityData(city);
     onCitySelect(city, country);
  };

  const handleCloseModal = () => {
    setSelectedCommunity(null);
    setSelectedCityData(null);
  };

  const MapUpdater = () => {
    const map = useMap();

    useEffect(() => {
      if (selectedCity) {
        const firstCommunity = selectedCity?.value ?selectedCity.value.communities[0]: selectedCity.communities[0];
        if (firstCommunity) {
          map.flyTo(
            [firstCommunity.coordinates.latitude, firstCommunity.coordinates.longitude],
            zoomLevel+8
          );
        }
      } else if (selectedCountry) {
        const firstCity = selectedCountry.value.cities[0];
        const firstCommunity = firstCity ? firstCity.communities[0] : null;

        if (firstCommunity) {
          map.flyTo(
            [firstCommunity.coordinates.latitude, firstCommunity.coordinates.longitude],
            zoomLevel
          );
        }
      }
    }, [selectedCountry, selectedCity, zoomLevel, map]);

    return null;
  };
  useEffect(() => {
    if (selectedCity && mapRef.current) {
      const map = mapRef.current;
      map.setView([selectedCity.latitude, selectedCity.longitude], 12); // Adjust zoom level as needed
    }
  }, [selectedCity]);

  const calculateRectangleBounds = (center, size) => {
    const halfSize = size / 2;
    return [
      [center[0] - halfSize, center[1] - halfSize],
      [center[0] + halfSize/10, center[1] + halfSize],
    ];
  };

  const filteredCommunities = selectedCountry
    ? (selectedCity
      ? selectedCity.value.communities
      : selectedCountry.value.cities.flatMap((city) => city.communities))
      .filter((community) => applyFilters(community.attributes, selectedAttribute, selectedFilters))
    : countriesData
      .flatMap((country) => country.cities.flatMap((city) => city.communities))
      .filter((community) => applyFilters(community.attributes, selectedAttribute, selectedFilters));

      const getSupportColor = (supportPercentage) => {
        if (supportPercentage >= 0 && supportPercentage <= 0.3) {
          return 'red';
        } else if (supportPercentage > 0.3 && supportPercentage <= 0.4) {
          return 'orange';
        } else {
          return 'green';
        }
      };
      const getSizeColor = (size) => {
        if (size >= 90000 ) {
          return 'red';
        } else if (size >50000 && size <= 90000) {
          return 'orange';
        } else {
          return 'blue';
        }
      };
  return (
    <div className="world-map-container">
      <MapContainer
       center={[ 35.7555, -97.3308]}
  zoom={zoomLevel}
  style={{ height: '95vh', width: '100%', zIndex: 0 }}
  whenCreated={(map) => (mapRef.current = map)}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">TrioWave</a> contributors'
  />
  {filteredCommunities.map((community) => (
    <>
      <CircleMarker
        key={community.name}
        center={[community.coordinates.latitude, community.coordinates.longitude]}
        radius={Math.sqrt(community.size) * 0.10}
        eventHandlers={{ click: () => handleMarkerClick(community) }}
        fillColor={getSizeColor(community.size/10)}
      >
        <Tooltip>{community.name}</Tooltip>
      </CircleMarker>
      {/* Add rectangles here */}
     
    </>
  ))}
  {countriesData.flatMap((country) =>
    country.cities.flatMap((city) => (
      
      <Marker
        position={[city.coordinates.latitude, city.coordinates.longitude]}
        icon={infoIcon}
        eventHandlers={{ click: () => handleCityClick(city, country) }}

      >
        <Popup 
            
        >{city.name}

          {/* <div className="modal">
            <embed
              src={'./Amsterdam.pdf'}
              type="application/pdf"
              height={800}
              width={500}
            />
          </div> */}
        </Popup>
        <Tooltip>{city.name}</Tooltip>
       {city.name ==='Amsterdam'&& 
       <Rectangle
        className='rectangle-test'
        bounds={calculateRectangleBounds(
          [city.coordinates.latitude -0.002 , city.coordinates.longitude],
         0.008
        )}
        color={getSupportColor(city.Support_pct)}  // getColor function should return color based on Support_pct
       opacity={1}
      >
        <Tooltip>{city.name}</Tooltip>
        <div>{city.name}</div>
        

      </Rectangle>}
      </Marker>
    ))
  )}
  <MapUpdater />
</MapContainer>
      {selectedCityData &&  <DataVisualization community={selectedCityData} onClose={handleCloseModal} />}
      {selectedCommunity && <DataVisualization community={selectedCommunity} onClose={handleCloseModal} />}
    </div>
  );
};

const applyFilters = (attributes, selectedAttribute, selectedFilters) => {
  if (selectedAttribute) {
    const attributeValue = attributes[selectedAttribute];
    if (selectedFilters.length === 0) {
      return true;
    } else {
      return selectedFilters.every((filter) => {
        if (filter.value === 'custom') {
          return parseFloat(attributeValue) > parseFloat(filter.customValue);
        } else {
          return parseFloat(attributeValue) > parseFloat(filter.value);
        }
      });
    }
  }
  return true;
};

export default WorldMap;
