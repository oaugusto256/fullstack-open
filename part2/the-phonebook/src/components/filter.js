import React, { useState } from 'react'

const Filter = ({ persons, handlePersonsFiltered }) => {
  const [toFilter, setToFilter] = useState('');

  const handleFilterBy = (event) => {
    const toFilter = event.target.value;
    setToFilter(toFilter);

    if (toFilter !== '') {
      const personsToFilter = persons.filter(person =>
        person.name.toLocaleLowerCase().includes(toFilter)
      );

      handlePersonsFiltered(personsToFilter);
    };
  };

  return (
    <div>
      filter shown with <input value={toFilter} onChange={handleFilterBy} />
    </div>
  )
}

export default Filter;
