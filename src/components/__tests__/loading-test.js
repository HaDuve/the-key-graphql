import React from 'react'
import ReactDOM from 'react-dom/client'
import LoadingSpinner from '../generic/LoadingSpinner/LoadingSpinner.tsx'

it('renders loading spinner without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.createRoot(div).render(<LoadingSpinner />)
})
