import "./App.css";
import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import LoginForm from "./components/authentication/login.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NodeViewer from "./components/content/nodeviewer.tsx";
import styles from "./styles.module.css";

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
    localStorage.clear();
    setUserName("");
    setIsLoggedIn(false);
    try {
      await client.resetStore();
    } catch (error) {
      console.warn("Error resetting store:", error);
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className={styles.container}>
        <header className="App-header">
          {!isLoggedIn ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <div className={styles.headercontainer}>
              <p>Hello, {userName}!</p>
              <button onClick={handleLogout}>Logout</button>
              <NodeViewer onLogout={handleLogout} />
            </div>
          )}
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
