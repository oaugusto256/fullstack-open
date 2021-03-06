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
            id="post-title"
            placeholder="Title"
            className="post-title"
            onChange={(event) => setNewPostTitle(event.target.value)}
          />
        </div>
        <div>
          author
          <input
            value={newPostAuthor}
            id="post-author"
            placeholder="Author"
            className="post-author"
            onChange={(event) => setNewPostAuthor(event.target.value)}
          />
        </div>
        <div>
          title
          <input
            value={newPostUrl}
            id="post-url"
            placeholder="Url"
            className="post-url"
            onChange={(event) => setNewPostUrl(event.target.value)}
          />
        </div>
        <div>
          likes
          <input
            value={newPostLikes}
            id="post-likes"
            placeholder="Likes"
            className="post-likes"
            onChange={(event) => setNewPostLikes(event.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default NewPostForm;
