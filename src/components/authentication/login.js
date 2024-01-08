import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../../graphql/mutations.ts";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });

      // Handle successful login response here
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

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
