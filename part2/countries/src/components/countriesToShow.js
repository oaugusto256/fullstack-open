import React from 'react'

import CountryFound from './countryFound';

const MAX_COUNTRIES_TO_RENDER = 10;
const COUNTRY_FOUND = 1;

const CountriesToShow = ({ countries }) => {
  const countryFound = countries[0];

  return (
    countries.length >= MAX_COUNTRIES_TO_RENDER ? (
      <p>Too many matches, specify the country' name...</p>
    ) : countries.length === COUNTRY_FOUND ? (
      <CountryFound country={countryFound} />
    ) : (
      <ul>
        {countries.map(country => <li key={country.alpha2Code}>{country.name}</li>)}
      </ul>
    )
  )
}

export default CountriesToShow
