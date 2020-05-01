import React from 'react'

import Header from './header';
import Content from './content';
import Total from './total';

const Courses = ({ courses }) => {
  return courses.map(course => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  ))
}

export default Courses;
