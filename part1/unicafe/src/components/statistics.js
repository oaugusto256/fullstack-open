import React from 'react'

import Statistic from './statistic';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good * 1) + (bad * (-1))) / total;
  const positive = (good / total) * 100;

  return (
    <>
      <h1>statistics</h1>
      {total ? (
        <table>
          <Statistic label="good" value={good} />
          <Statistic label="neutral" value={neutral} />
          <Statistic label="bad" value={bad} />
          <Statistic label="total" value={total} />
          <section>
            <Statistic label="average" value={average} />
            <span><Statistic label="positive" value={positive} /> %</span>
          </section>
        </table>
      ) : (
          <p>No feedback given</p>
        )}
    </>
  )
}

export default Statistics
