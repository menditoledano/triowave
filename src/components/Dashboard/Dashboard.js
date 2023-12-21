// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import WorldMap from '../WorldMap/WorldMap';
import data from '../../data/communityData.json';
import Select from 'react-select';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data && data.countries) {
          setCountriesData(data.countries);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const getFilterOptions = () => {
    if (selectedCountry && selectedCity && selectedCity.value) {
      const city = selectedCountry.value.cities.find((c) => c.name === selectedCity.value.name);
      if (city) {
        const attributes = city.communities.reduce((acc, community) => {
          Object.keys(community.attributes).forEach((attribute) => {
            if (!acc.includes(attribute)) {
              acc.push(attribute);
            }
          });
          return acc;
        }, []);
        return attributes.map((attribute) => ({ value: attribute, label: attribute }));
      }
    }
    return [];
  };

  const filterOptions = getFilterOptions();

    // Add an option to choose the value of the attribute
    if (selectedAttribute) {
      filterOptions.push({ value: 'custom', label: `Custom Value for ${selectedAttribute}` });
    }
  

  const countryOptions = countriesData.map((country) => ({
    value: country,
    label: country.name,
  }));

  const cityOptions = selectedCountry
    ? selectedCountry.value.cities.map((city) => ({
        value: city,
        label: city.name,
      }))
    : [];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };


  const handleAttributeChange = (selectedOption) => {
    setSelectedAttribute(selectedOption ? selectedOption.value : null);
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };

 // Custom styles for react-select options
 const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1A237E' : 'white', // Change the background color of selected options
    color: state.isSelected ? 'white' : 'black', // Change the text color of selected options
  }),
};

return (
  <div className="dashboard-container">
    <header>
    <div className="header-left">
      <img src="/trioWaveLogo.png" alt="Your Logo" className="app-logo" />
      <h1>TrioWave</h1>
      <p className="slogan">Where Exploration Meets Insight</p>
    </div>
    <div className="header-right">
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="Select country..."
        className="filter-dropdown"
        styles={customStyles}
      />
      {selectedCountry && (
        <>
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Select city..."
            className="filter-dropdown"
            isDisabled={!selectedCountry}
            styles={customStyles}
          />
        </>
      )}
      <Select
        options={filterOptions}
        isMulti
        value={selectedFilters}
        onChange={handleFilterChange}
        placeholder="Select filters..."
        className="filter-dropdown"
        styles={customStyles}
      />
      </div>
    </header>
    <main>
      <WorldMap countriesData={countriesData} selectedCountry={selectedCountry} selectedCity={selectedCity} />
    </main>
  </div>
);
};

export default Dashboard;
