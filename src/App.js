import "./App.css";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import NodeViewer from "./components/content/nodeviewer";
import LoginForm from "./components/authentication/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (token = "") => {
    if (token) {
      localStorage.setItem("token", token);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await client.resetStore();
    setIsLoggedIn(false);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>The Key graphql react app</h1>
          {!isLoggedIn ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
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
