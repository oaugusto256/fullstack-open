import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Statistics from './components/statistics';
import Button from './components/button';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <main>
      <h1>give feedback</h1>
      <section>
        <Button onClick={() => setGood(good + 1)} label="good" />
        <Button onClick={() => setNeutral(neutral + 1)} label="neutral" />
        <Button onClick={() => setBad(bad + 1)} label="bad" />
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