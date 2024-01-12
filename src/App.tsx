import "./App.css";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import NodeViewer from "./components/content/nodeviewer.tsx";
import LoginForm from "./components/authentication/login.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (token = "", user = "") => {
    if (token) {
      localStorage.setItem("token", token);
    }
    if (user) {
      setUserName(user);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await client.resetStore();
    setUserName("");
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
              <p>Hello, {userName}!</p>
              <button onClick={handleLogout}>Logout</button>
              <NodeViewer />
            </div>
          )}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
