import React from 'react'


const SuccessNotification = ({ message }) => {
    if (message === null || message ==='') {
      return null
    }
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
  
  const ErrorNotification = ({ message }) => {
    if (message === null || message ==='') {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

const exports = {SuccessNotification, ErrorNotification}

export default exports