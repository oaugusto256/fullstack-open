import React from 'react'

import { useSelector } from 'react-redux'

import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const filterBy = useSelector(state => state.filter.filterBy);
  const anecdotes = useSelector(state => state.anecdotes);

  const anecdotesToRender = filterBy
    ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterBy.toLowerCase()))
    : anecdotes.sort((a, b) => b.votes - a.votes);

  return anecdotesToRender.map(anecdote =>
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
    />
  )
}

export default AnecdoteList
