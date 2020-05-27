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
        <h2>{post.title}</h2>
        <div className="buttons-row">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setShowDetails(!showDetails)}>{`${!showDetails ? "Show details" : "Close details"}`}</button>
        </div>
      </div>
      {showDetails && (
        <>
          <p>{post.author}</p>
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
