import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  console.log(good, neutral, bad);

  const total = good + neutral + bad;

  return (
    <main>
      <h1>give feedback</h1>
      <section>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </section>
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
    </main>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);