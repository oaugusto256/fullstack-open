import React from 'react';

import { gql, useQuery } from '@apollo/client'

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const ALL_PERSONS = gql`
query {
  allPersons  {
    name
    phone
    id
  }
}
`

function App() {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  )
}

export default App;
