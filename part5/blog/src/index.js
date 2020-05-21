import React, { useState } from "react";
import ReactDOM from "react-dom";

import loginService from "./services/login";

import "./index.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      console.log("Login was made successfully!");

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  return (
    <>
      <h1>Blog</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);