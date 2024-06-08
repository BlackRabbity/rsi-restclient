import React, { useState } from "react";
import "../styles/Login.css";
import userServiceSingleton from "../services/userService";
import loginService from "../services/loginService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = new userServiceSingleton();
  const [isAuthenticated, setIsAuthenticated] = useState(user.getHeader());

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = btoa(`${username}:${password}`);
    const authHeader = `Basic ${credentials}`;
    console.log(authHeader);
    try {
      const response = await loginService.login(authHeader);
      console.log(response.status)
      if (response.status === 200) {
        user.setHeader(authHeader);
        console.log("Login successful!");
        setIsAuthenticated(user.getHeader());
      } else
      {
        console.log("huh?");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
