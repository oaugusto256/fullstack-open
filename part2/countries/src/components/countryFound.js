import React, { useState, useEffect } from 'react'

import axios from "axios";

const WEATHERSTACK_API_KEY = process.env.REACT_APP_API_KEY;

const CountryFound = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data);
      });
  }, [country.capital]);

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img className="country-flag" alt="Country flag" src={country.flag} />
      <h2>Weather in {country.capital}</h2>
      {weather && weather.current && (
        <>
          <p><strong>temperature:</strong> {weather.current.temperature}</p>
          <p><strong>wind:</strong> {`${weather.current.wind_speed} mph direction ${weather.current.wind_dir}`}</p>
          <img alt="Weather icon" src={weather.current.weather_icons[0]} />
        </>
      )}
    </>
  )
}

export default CountryFound;
