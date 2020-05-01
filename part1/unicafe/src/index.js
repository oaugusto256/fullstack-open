import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Statistics from './components/statistics';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  return (
    <main>
      <h1>give feedback</h1>
      <section>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </section>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </main>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);