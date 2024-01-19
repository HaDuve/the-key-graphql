import { render, screen } from '@testing-library/react'
import App from './App'

// TESTS //

it('renders login form', () => {
  render(<App />)
  const linkElement = screen.getByText(/Login Form/i)
  expect(linkElement).toBeInTheDocument()
})
