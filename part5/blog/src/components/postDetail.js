import React from "react";

const PostDetail = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.author}</p>
      <p>{post.likes}</p>
    </div>
  );
};

export default PostDetail;
