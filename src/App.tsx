import "./App.css";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import LoginForm from "./components/authentication/login.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NodeViewer from "./components/content/nodeViewer.tsx";

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
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUserName("");
    setIsLoggedIn(false);
    try {
      await client.resetStore();
    } catch (error) {
      console.log("Error resetting store:", error);
    }
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
              <DndProvider backend={HTML5Backend}>
                <NodeViewer />
              </DndProvider>
            </div>
          )}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
