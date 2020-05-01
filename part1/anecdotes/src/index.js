import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const anecdotesVotesArray = new Array(anecdotes.length).fill(0);

const MIN_INDEX = 0;
const MAX_INDEX = anecdotes.length;

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [anecdotesVotes, setAnecdotesVotes] = useState(anecdotesVotesArray);

  const handleDisplayRandomAnecdote = () => {
    const randomIndex = MIN_INDEX + Math.floor((MAX_INDEX - MIN_INDEX) * Math.random());

    setSelected(randomIndex);
  };

  const handleAnecdoteVote = () => {
    const copy = [...anecdotesVotes];

    copy[selected] += 1;

    setAnecdotesVotes(copy);
  };

  useEffect(() => {
    const mostVotedIndex = anecdotesVotes.indexOf(Math.max(...anecdotesVotes));

    setMostVoted(mostVotedIndex);
  });

  return (
    <div>
      <section>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {anecdotesVotes[selected]} votes</p>
        <button onClick={handleAnecdoteVote}>Vote</button>
        <button onClick={handleDisplayRandomAnecdote}>Get a random programming anecdote!</button>
      </section>
      <section>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[mostVoted]}</p>
        <p>has {anecdotesVotes[mostVoted]} votes</p>
      </section>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);