import React from 'react'

import { useDispatch } from 'react-redux'

import { vote } from "../reducers/anecdoteReducer";
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleClickVote = () => {
    dispatch(vote(anecdote));

    dispatch(showNotification(`You voted ${anecdote.content}!`, 3));
  };

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClickVote}>vote</button>
      </div>
    </>
  )
}

export default Anecdote
