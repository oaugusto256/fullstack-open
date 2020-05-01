import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);


  const [personsFiltered, setPersonsFiltered] = useState([]);

  const handleNewPerson = (newPerson) => {
    setPersons([
      ...persons,
      newPerson
    ]);
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
