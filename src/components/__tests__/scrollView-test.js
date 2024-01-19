import React from 'react'
import ReactDOM from 'react-dom/client'
import ScrollView from '../generic/ScrollView.tsx'

it('renders scroll view without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.createRoot(div).render(<ScrollView />)
})
