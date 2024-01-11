import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations.ts";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginJwtInput = { email: username, password: password };

  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { input: loginJwtInput },
      });
      // validate that data includes a loginJwt
      const token = data.Auth.loginJwt.loginResult.jwtTokens.accessToken;
      const isTokenInvalid =
        !token || typeof token !== "string" || token.length < 1;

      if (!isTokenInvalid) {
        onLoginSuccess(token);
      }
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
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

export default LoginForm;
