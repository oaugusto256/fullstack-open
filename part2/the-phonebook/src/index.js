import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: '55 91 98214-5577'
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
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
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
