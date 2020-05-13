import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import thePhonebookServices from "./services/thePhonebook";

import './index.css';

import Filter from './components/filter';
import PersonForm from './components/personForm';
import Persons from './components/persons';
import Notification from "./components/notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'error', show: false });

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

        setNotification({
          message: `${newPerson.name} added successfully!`,
          type: 'success',
          show: true
        });

        setTimeout(() => {
          setNotification({
            show: false,
          });
        }, 3000);
      })
      .catch(error => {
        setNotification({
          message: error.response.data.error,
          type: 'error',
          show: true
        });

        setTimeout(() => {
          setNotification({
            show: false,
          });
        }, 3000);
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

          setNotification({
            message: `${personToRemove.name} removed successfully!`,
            type: 'success',
            show: true
          });

          setTimeout(() => {
            setNotification({
              show: false,
            });
          }, 3000);
        })
        .catch(error => {
          setNotification({
            message: `Information of ${personToRemove.name} has already been removed from server`,
            type: 'error',
            show: true
          });

          setTimeout(() => {
            setNotification({
              show: false,
            });
          }, 3000);
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
      <Notification {...notification} />
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
