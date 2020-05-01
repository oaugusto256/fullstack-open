import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [personsFiltered, setPersonsFiltered] = useState([]);

  const isNameAlreadyAdded = (name) => {
    return persons.some(person => person.name === name);
  };

  const handleAddNewPerson = (event) => {
    event.preventDefault();

    if (newName === '' || newPhone === '') {
      alert('Please, insert a person name or phone before add.');

      return;
    }

    if (isNameAlreadyAdded(newName)) {
      alert(`${newName} is already added to phonebook`);

      return;
    }

    const personObject = {
      name: newName,
      phone: newPhone
    };

    setPersons([
      ...persons,
      personObject
    ]);

    setNewName('');
    setNewPhone('');
  }

  const handleFilterBy = (event) => {
    const toFilter = event.target.value;
    setToFilter(toFilter);

    if (toFilter !== '') {
      const personsToFilter = persons.filter(person =>
        person.name.toLocaleLowerCase().includes(toFilter)
      );

      setPersonsFiltered(personsToFilter);
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={toFilter} onChange={handleFilterBy} />
      </div>
      <form>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
          phone: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} />
        </div>
        <div>
          <button onClick={handleAddNewPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {toFilter !== '' ? (
          <>
            {personsFiltered.map(person => (
              <li key={person.name}>
                {person.name} {person.phone}
              </li>))}
          </>
        ) : (
            <>
              {persons.map(person => (
                <li key={person.name}>
                  {person.name} {person.phone}
                </li>))}
            </>
          )}
      </ul>
    </div >
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
