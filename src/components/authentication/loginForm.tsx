import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../../graphql/mutations.ts'
import {
  capitalizeEachWord,
  isValidString,
  splitNameFromMail,
} from '../../util/string.ts'
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageConst.ts'
import LoadingSpinner from '../generic/LoadingSpinner/LoadingSpinner.tsx'

const LoginForm = ({ onLoginSuccess }) => {
  // form input states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userNameWithoutEmail = splitNameFromMail(username)
  const userNameCapitalized = capitalizeEachWord(userNameWithoutEmail)

  // valid form states
  const [usernameValid, setUsernameValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [markInvalid, setMarkInvalid] = useState(false)

  // login graphql
  const loginJwtInput = { email: username, password: password }
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = async () => {
    // catch possible form errors
    const isUsernameValid = isValidString(username)
    const isPasswordValid = isValidString(password)
    setUsernameValid(isUsernameValid)
    setPasswordValid(isPasswordValid)
    if (!isUsernameValid || !isPasswordValid) {
      setMarkInvalid(true)
      return
    }
    setMarkInvalid(false)
    try {
      const { data } = await loginMutation({
        variables: { input: loginJwtInput },
      })
      // validate that data includes a loginJwt
      const token = data?.Auth?.loginJwt?.loginResult?.jwtTokens?.accessToken
      const isTokenInvalid =
        !token || typeof token !== 'string' || token.length < 1

      if (!isTokenInvalid) {
        // store token and username in local storage
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token)
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, userNameCapitalized)
        onLoginSuccess(token, userNameCapitalized)
      }
    } catch (error) {
      // Handle login error
      console.error('Login error:', error)
    }
  }

  useEffect(() => {
    // check if user is already logged in
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER)
    if (token && user) onLoginSuccess(token, user)
  })

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <h2 style={{ marginLeft: 100 }}>Login Form</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          margin: 10,
        }}
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: 200, margin: 10 }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: 200, margin: 10 }}
          />
        </label>
        <button type="submit" disabled={loading}>
          {'Login'}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
      {markInvalid && (
        <p style={{ color: 'red' }}>
          Please enter correct {usernameValid ? '' : 'Username'}
          {!usernameValid && !passwordValid && ' and '}
          {passwordValid ? '' : 'Password'}!
        </p>
      )}
    </div>
  )
}

export default LoginForm
