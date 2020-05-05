import React from 'react'

const CountryFound = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img className="country-flag" alt="Country flag" src={country.flag} />
    </>
  )
}

export default CountryFound;
