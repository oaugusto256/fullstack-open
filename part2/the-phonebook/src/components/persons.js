import React from 'react'

const Persons = ({ personsFiltered, persons, handleRemovePerson }) => {
  return (
    <ul>
      {personsFiltered.length > 0 ? (
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
                {person.name} {person.phone} <button onClick={() => handleRemovePerson(person)}>delete</button>
              </li>
            ))}
          </>
        )}
    </ul>
  )
}

export default Persons
