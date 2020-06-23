import React from 'react'

import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <>
      <AnecdoteList />
      <NewAnecdote />
    </>
  )
}

export default App