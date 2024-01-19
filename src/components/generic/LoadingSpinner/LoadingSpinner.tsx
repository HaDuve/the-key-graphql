import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
