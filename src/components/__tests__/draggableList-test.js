import React from 'react'
import ReactDOM from 'react-dom/client'
import DraggableList from '../content/draggableList.tsx'

it('renders draggable list without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.createRoot(div).render(<DraggableList />)
})
