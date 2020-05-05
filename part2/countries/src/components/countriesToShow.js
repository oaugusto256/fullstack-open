import React, { useState } from 'react'

import CountryFound from './countryFound';

const MAX_COUNTRIES_TO_RENDER = 10;
const COUNTRY_FOUND = 1;

const CountriesToShow = ({ countries }) => {
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [countrySelected, setCountrySelected] = useState({});

  const countryFound = countries[0];

  const handleShowCountry = (country) => {
    setCountrySelected(country);
    setIsCountrySelected(true);
  };

  return (
    countries.length >= MAX_COUNTRIES_TO_RENDER ? (
      <p>Too many matches, specify the country' name...</p>
    ) : countries.length === COUNTRY_FOUND ? (
      <CountryFound country={countryFound} />
    ) : isCountrySelected ? (
      <CountryFound country={countrySelected} />
    ) : (
      <ul>
        {countries.map(country => {
          return (
            <div className="country-list" key={country.alpha2Code}>
              <li>{country.name}</li>
              <button onClick={() => handleShowCountry(country)}>show</button>
            </div>
          );
        })}
      </ul>
    )
  )
}

export default CountriesToShow
