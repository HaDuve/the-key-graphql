import "./App.css";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Login from "./components/authentication/login";
import client from "./apollo";
import NodeViewer from "./components/content/nodeviewer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login status on successful login
  };

  const handleLogout = () => {
    // Implement logout functionality, clear tokens, reset state, etc.
    setIsLoggedIn(false);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>The Key graphql react app</h1>
          {!isLoggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <div>
              <p>User is logged in!</p>
              <NodeViewer />
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
