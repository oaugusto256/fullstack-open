import React from 'react'

import { useSelector } from 'react-redux'

import Anecdote from './components/Anecdote'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  const anecdotes = useSelector(state => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
      <NewAnecdote />
    </div>
  )
}

export default App