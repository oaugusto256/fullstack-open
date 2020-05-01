import React from 'react'

const Content = ({ content }) => {
  return (
    <>
      {content.map(part => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      })}
    </>
  )
}

export default Content
