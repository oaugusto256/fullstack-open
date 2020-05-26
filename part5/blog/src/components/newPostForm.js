import React, { useState } from "react";

const NewPostForm = ({ addBlogPost }) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");
  const [newPostLikes, setNewPostLikes] = useState("");

  const handleAddBlogPost = (event) => {
    event.preventDefault();

    const postObject = {
      title: newPostTitle,
      author: newPostAuthor,
      likes: newPostLikes,
      url: newPostUrl,
    };

    addBlogPost({ postObject });

    setNewPostTitle("");
    setNewPostAuthor("");
    setNewPostUrl("");
    setNewPostLikes("");
  };

  return (
    <>
      <h2>New post</h2>
      <form onSubmit={handleAddBlogPost}>
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
  );
};

export default NewPostForm;
