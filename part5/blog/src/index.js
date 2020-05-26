import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import LoginForm from "./components/loginForm";
import Togglable from "./components/togglable";
import NewPostForm from "./components/newPostForm";
import PostList from "./components/postList";

import blogsService from "./services/blogs";
import loginService from "./services/login";

import "./index.css";

const LOGGED_BLOG_USER_KEY = "loggedBlogUser";

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_USER_KEY);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await blogsService.getAll();
      setPosts(posts);
    }

    fetchPosts();
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      });

      blogsService.setToken(user.token);
      window.localStorage.setItem(LOGGED_BLOG_USER_KEY, JSON.stringify(user));

      console.log("Login was made successfully!");

      setUser(user);
    } catch (exception) {
      console.log("Wrong credentials");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(LOGGED_BLOG_USER_KEY);
  };

  const addBlogPost = ({ postObject }) => {
    blogsService
      .create(postObject)
      .then(returnedPost => {
        console.log(returnedPost);
      });
  };

  return (
    <>
      <h1>Blog</h1>
      {user === null && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <>
          <p>{`User: ${user.name} is logged.`}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <Togglable buttonLabel="new post">
        {user && (
          <NewPostForm addBlogPost={addBlogPost} />
        )}
      </Togglable>
      <PostList posts={posts} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);