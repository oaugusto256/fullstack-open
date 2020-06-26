import React from 'react'

import { useDispatch } from 'react-redux'

import { vote } from "../reducers/anecdoteReducer";
import { showNotification, resetState } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleClickVote = () => {
    dispatch(vote(anecdote));
    dispatch(showNotification(`You voted ${anecdote.content}!`));

    setTimeout(() => {
      dispatch(resetState())
    }, 5000);
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
