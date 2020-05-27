import React, { useState } from "react";

const PostDetail = ({ post, updateBlogPost }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    updateBlogPost({
      postObject: {
        ...post,
        likes: post.likes + 1
      }
    });
  };

  return (
    <div className="post">
      <div className="post-row">
        <h2>{post.title}</h2>
        <button onClick={() => setShowDetails(!showDetails)}>{`${!showDetails ? "Show details" : "Close details"}`}</button>
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
