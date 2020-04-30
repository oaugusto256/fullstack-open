import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header';
import Content from './components/content';
import Total from './components/total';

const App = () => {
  const course = 'Half Stack application development';

  const content = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))