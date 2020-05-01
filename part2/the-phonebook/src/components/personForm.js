import React, { useState } from 'react'

const PersonForm = ({ currentPersons, handleNewPerson }) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');


  const isNameAlreadyAdded = (name) => {
    return currentPersons.some(person => person.name === name);
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

    handleNewPerson(personObject);

    setNewName('');
    setNewPhone('');
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        phone: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} />
      </div>
      <div>
        <button onClick={handleAddNewPerson} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
