import React from 'react'

import { useSelector } from 'react-redux'

import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const anecdotesSortByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotesSortByVotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </>
  )
}

export default AnecdoteList
