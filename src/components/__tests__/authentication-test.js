import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginForm from '../authentication/loginForm.tsx'

it('renders login form without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.createRoot(div).render(<LoginForm />)
})
