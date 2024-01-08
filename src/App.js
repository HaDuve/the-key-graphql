import "./App.css";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION } from "./graphql/mutations";
import { GET_CONTENT_NODES_QUERY } from "./graphql/queries";

function App() {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const { loading, error, data } = useQuery(GET_CONTENT_NODES_QUERY);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { username: "exampleUser", password: "examplePassword" }, // Replace with actual username and password input values
      });
      // Handle login response, store tokens, update UI, etc.
      console.log("Login response:", data);
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await logoutMutation();
      // Handle logout response, clear tokens, update UI, etc.
      console.log("Logout response:", data);
    } catch (error) {
      // Handle logout error
      console.error("Logout error:", error);
    }
  };

  // Use data from GET_CONTENT_NODES_QUERY
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const contentNodes = data?.Admin?.Tree?.GetContentNodes || [];

  // Display content nodes
  return (
    <div className="App">
      <header className="App-header">
        {/* Your other elements */}
        <div>
          <h2>Content Nodes:</h2>
          <ul>
            {contentNodes.map((node, index) => (
              <li key={index}>{node?.structureDefinition?.title}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
