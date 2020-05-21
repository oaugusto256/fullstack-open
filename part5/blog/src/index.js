import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import LoginForm from "./components/loginForm";

import blogsService from "./services/blogs";
import loginService from "./services/login";

import "./index.css";

const LOGGED_BLOG_USER_KEY = "loggedBlogUser";

const App = () => {
  const [user, setUser] = useState(null);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");
  const [newPostLikes, setNewPostLikes] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOG_USER_KEY);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
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

  const addBlogPost = (event) => {
    event.preventDefault();

    const postObject = {
      title: newPostTitle,
      author: newPostAuthor,
      likes: newPostLikes,
      url: newPostUrl,
    };

    blogsService
      .create(postObject)
      .then(returnedPost => {
        console.log(returnedPost);
        setNewPostTitle("");
        setNewPostAuthor("");
        setNewPostLikes("");
        setNewPostUrl("");
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
      {user && (
        <>
          <h2>New blog post</h2>
          <form onSubmit={addBlogPost}>
            <div>
              title
              <input
                value={newPostTitle}
                placeholder="Title"
                onChange={(event) => setNewPostTitle(event.target.value)}
              />
            </div>
            <div>
              author
              <input
                value={newPostAuthor}
                placeholder="Author"
                onChange={(event) => setNewPostAuthor(event.target.value)}
              />
            </div>
            <div>
              title
              <input
                value={newPostUrl}
                placeholder="Url"
                onChange={(event) => setNewPostUrl(event.target.value)}
              />
            </div>
            <div>
              likes
              <input
                value={newPostLikes}
                placeholder="Likes"
                onChange={(event) => setNewPostLikes(event.target.value)}
              />
            </div>
            <button type="submit">save</button>
          </form>
        </>
      )}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);