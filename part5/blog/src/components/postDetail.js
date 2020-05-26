import React, { useState } from "react";

const PostDetail = ({ post }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="post">
      <div className="post-row">
        <h2>{post.title}</h2>
        <button onClick={() => setShowDetails(!showDetails)}>{`${!showDetails ? 'Show details' : 'Close details'}`}</button>
      </div>
      {showDetails && (
        <>
          <p>{post.author}</p>
          <p>{post.likes}</p>
        </>
      )}
    </div>
  );
};

export default PostDetail;
