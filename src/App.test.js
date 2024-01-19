import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { time } from 'console'

// SETUP //

function setup(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  }
}

// TESTS //

it('renders login form', () => {
  render(<App />)
  const linkElement = screen.getByText(/Login Form/i)
  expect(linkElement).toBeInTheDocument()
})

it('login fails with wrong credentials', async () => {
  const { user } = setup(<App />)

  await user.type(screen.getByLabelText(/username/i), 'john')
  await user.type(screen.getByLabelText(/password/i), 'wrong-password')
  await user.click(screen.getByRole('button', { name: /Login/i }))
  // wait 2000ms
  await new Promise((r) => setTimeout(r, 2000))
  const errorText = await screen.findByText(/Error/i)
  expect(errorText).toBeInTheDocument()
})

xit('login succeeds with correct credentials', async () => {
  const { user } = setup(<App />)

  // get username and password via environment variables
  const username = process.env.USERNAME
  const password = process.env.PASSWORD
  await user.type(screen.getByLabelText(/username/i), username)
  await user.type(screen.getByLabelText(/password/i), password)
  await user.click(screen.getByRole('button', { name: /Login/i }))
  // wait 2000ms
  await new Promise((r) => setTimeout(r, 2000))
  const successText = await screen.findByText(/Hello/i)
  expect(successText).toBeInTheDocument()
})
