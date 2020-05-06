import React from 'react'

const Notification = ({ message, type, show }) => {
  if (show === false) {
    return null;
  }

  return (
    <div className={`notification ${type || "error"}`}>
      {message}
    </div>
  )
}

export default Notification;
