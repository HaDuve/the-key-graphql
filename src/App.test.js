import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { act } from 'react-dom/test-utils'

const CONFIDENTIAL = {
  // userName: "<enter your username>",
  // password: "<enter your password>",
}

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

  await act(
    async () => await user.type(screen.getByLabelText(/username/i), 'john'),
  )
  await act(
    async () =>
      await user.type(screen.getByLabelText(/password/i), 'wrong-password'),
  )
  await act(
    async () =>
      await user.click(screen.getByRole('button', { name: /Login/i })),
  )

  await new Promise((r) => setTimeout(r, 3000))
  const errorText = await screen.findByText(/Error/i)
  expect(errorText).toBeInTheDocument()
})

xit('login succeeds with correct credentials', async () => {
  const { user } = setup(<App />)

  // get username and password via environment variables
  await act(
    async () =>
      await user.type(
        screen.getByLabelText(/username/i),
        CONFIDENTIAL.userName,
      ),
  )
  await act(
    async () =>
      await user.type(
        screen.getByLabelText(/password/i),
        CONFIDENTIAL.password,
      ),
  )
  await act(
    async () =>
      await user.click(screen.getByRole('button', { name: /Login/i })),
  )
  await new Promise((r) => setTimeout(r, 3000))
  const successText = await screen.findByText(/Hello, /i)
  await waitFor(() => {
    expect(successText).toBeInTheDocument()
  })
})
