import React, { useState } from "react";

const PostDetail = ({ post, updateBlogPost, deleteBlogPost }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    updateBlogPost({
      postObject: {
        ...post,
        likes: post.likes + 1
      }
    });
  };

  const handleDelete = () => {
    deleteBlogPost({ postObject: post });
  };

  return (
    <div className="post">
      <div className="post-row">
        <h2 className="title">{post.title}</h2>
        <p className="author" >{`Author: ${post.author}`}</p>
        <div className="buttons-row">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setShowDetails(!showDetails)}>{`${!showDetails ? "Show details" : "Close details"}`}</button>
        </div>
      </div>
      {showDetails && (
        <>
          <div className="post-row">
            <p>{`Likes: ${post.likes}`}</p>
            <button onClick={handleLike}>Like</button>
          </div>

        </>
      )}
    </div>
  );
};

export default PostDetail;
