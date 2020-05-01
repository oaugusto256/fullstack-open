import React from 'react'

export default function Total({ content }) {
  const total = content.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <strong>total of exercisess {total}</strong>
  )
}
