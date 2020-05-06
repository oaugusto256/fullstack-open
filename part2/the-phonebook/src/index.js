import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";

import './index.css';

import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';

const App = () => {
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const handleNewPerson = (newPerson) => {
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons([
          ...persons,
          newPerson
        ]);
      });
  }

  const handlePersonsFiltered = (persons) => {
    setPersonsFiltered(persons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        handlePersonsFiltered={handlePersonsFiltered}
      />
      <h2>add a new</h2>
      <PersonForm
        currentPersons={persons}
        handleNewPerson={handleNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        personsFiltered={personsFiltered}
      />
    </div >
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
