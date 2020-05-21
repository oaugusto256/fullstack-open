import React, { useState } from "react";
import ReactDOM from "react-dom";

import LoginForm from "./components/loginForm";

import blogsService from "./services/blogs";
import loginService from "./services/login";

import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      });

      blogsService.setToken(user.token);

      console.log("Login was made successfully!");

      setUser(user);
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  return (
    <>
      <h1>Blog</h1>
      {user === null && <LoginForm handleLogin={handleLogin} />}
      {user && <p>{`User: ${user.name} is logged.`}</p>}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);