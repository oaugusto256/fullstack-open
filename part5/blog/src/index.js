import React, { useState } from "react";
import ReactDOM from "react-dom";

import LoginForm from "./components/loginForm";

import loginService from "./services/login";

import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      });

      console.log("Login was made successfully!");

      setUser(user);
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  return (
    <>
      <h1>Blog</h1>
      <LoginForm handleLogin={handleLogin} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);