import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import thePhonebookServices from "./services/thePhonebook";

import './index.css';

import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';

const App = () => {
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    thePhonebookServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handleNewPerson = (newPerson) => {
    thePhonebookServices
      .create(newPerson)
      .then(personCreated => {
        setPersons([
          ...persons,
          personCreated
        ]);
      });
  }

  const handlePersonsFiltered = (persons) => {
    setPersonsFiltered(persons);
  }

  const handleRemovePerson = (personToRemove) => {
    if (window.confirm(`Do you really want to remove ${personToRemove.name}?`)) {
      thePhonebookServices
        .remove(personToRemove.id)
        .then(() => {
          const personsWithoutPersonRemoved =
            persons.filter(person => person.name !== personToRemove.name);

          setPersons(personsWithoutPersonRemoved);
        });
    };
  };

  const handleUpdatePerson = (personToUpdate) => {
    thePhonebookServices
      .update(personToUpdate.id, personToUpdate)
      .then(personUpdated => {
        const personUpdatedIndex = persons.findIndex(person => person.id === personToUpdate.id);
        const newPersons = [...persons];

        newPersons[personUpdatedIndex] = {
          ...personUpdated
        };

        setPersons(newPersons);
      })
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
        handleUpdatePerson={handleUpdatePerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        personsFiltered={personsFiltered}
        handleRemovePerson={handleRemovePerson}
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
