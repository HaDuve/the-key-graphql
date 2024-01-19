import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('renders app', () => {
  render(<App />)
  const linkElement = screen.getByText(/The Key graphql react app/i)
  expect(linkElement).toBeInTheDocument()
})

it('renders login form', () => {
  render(<App />)
  const linkElement = screen.getByText(/Login Form/i)
  expect(linkElement).toBeInTheDocument()
})

function setup(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  }
}

xit('user can press login', async () => {
  const { user } = setup(<App />)

  await user.type(screen.getByLabelText(/username/i), 'john')
  await user.type(screen.getByLabelText(/password/i), 'i-am-secret')
  await user.click(screen.getByRole('button', { name: /submit/i }))
})
