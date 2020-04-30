import React from 'react'

export default function Total({ content }) {
  return (
    <p>Number of exercisess {content[0].exercises + content[1].exercises + content[2].exercises}</p>
  )
}
