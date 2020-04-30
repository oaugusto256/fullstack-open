import React from 'react'

const Content = ({ content }) => {
  return (
    <>
      {content.map(part => {
        return (
          <p>
            {part.name} {part.exercises}
          </p>
        )
      })}
    </>
  )
}

export default Content
