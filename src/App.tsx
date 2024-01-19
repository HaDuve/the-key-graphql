import './App.css'
import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './apollo'
import LoginForm from './components/authentication/loginForm.tsx'
import NodeViewer from './components/content/nodeviewer.tsx'
import ScrollView from './components/generic/ScrollView.tsx'
import './styles.module.css'
import { LOCAL_STORAGE_KEYS } from './constants/localStorageConst.ts'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const handleLoginSuccess = (token = '', user = '') => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token)
    }
    if (user) {
      setUserName(user)
    }
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    localStorage.clear()
    setUserName('')
    setIsLoggedIn(false)
    try {
      await client.resetStore()
    } catch (error) {
      // console.warn("Error resetting store:", error);
    }
  }

  return (
    <ApolloProvider client={client}>
      <header className="App-header">
        {!isLoggedIn ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            <div className="headercontainer">
              <p>Hello, {userName}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <ScrollView>
              <NodeViewer onLogout={handleLogout} />
            </ScrollView>
          </div>
        )}
      </header>
    </ApolloProvider>
  )
}

export default App
