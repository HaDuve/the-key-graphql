import React from 'react'
import ReactDOM from 'react-dom/client'
import NodeViewer from '../content/nodeviewer.tsx'

it('renders node viewer without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.createRoot(div).render(<NodeViewer />)
})
