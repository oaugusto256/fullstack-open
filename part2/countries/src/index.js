import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import './index.css';
import CountriesToShow from './components/countriesToShow';

const App = () => {
  const [countryQuery, setCountryQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, [])

  const handleCountryChanges = async (event) => {
    if (event.target.value === '') {
      clearState();
    }

    await setCountryQuery(event.target.value);

    const countriesFound = countries.filter(country => country.name.toLocaleLowerCase().includes(countryQuery));

    setCountriesToShow(countriesFound);
  };

  const clearState = () => {
    setCountriesToShow([]);
    setCountryQuery('');

    return;
  }

  return (
    <>
      <div>
        find countries <input onChange={handleCountryChanges} value={countryQuery} placeholder="Filter countries..." />
        {countryQuery !== '' && (
          <CountriesToShow countries={countriesToShow} />
        )}
      </div>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
