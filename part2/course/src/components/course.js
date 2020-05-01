import React from 'react'

import Header from './header';
import Content from './content';
import Total from './total';

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </>
  )
}

export default Course;
