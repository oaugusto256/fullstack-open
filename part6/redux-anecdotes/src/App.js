import React from 'react'

import NewAnecdote from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <>
      <AnecdoteList />
      <Notification />
      <NewAnecdote />
    </>
  )
}

export default App