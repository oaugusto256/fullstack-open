import React from 'react'

const Content = ({ content }) => {
  return (
    <>
      {content.map(contentItem => {
        return (
          <p>
            {contentItem.part} {contentItem.exercises}
          </p>
        )
      })}
    </>
  )
}

export default Content
