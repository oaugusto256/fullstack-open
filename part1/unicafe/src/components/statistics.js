import React from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  return (
    <>
      <h1>statistics</h1>
      <section>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>total {total}</p>
      </section>
      {total ? (
        <section>
          <p>average {((good * 1) + (bad * (-1))) / total}</p>
          <p>positive {(good / total) * 100} %</p>
        </section>
      ) : null}
    </>
  )
}

export default Statistics
