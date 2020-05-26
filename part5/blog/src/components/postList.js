import React from "react";

import PostDetail from "./postDetail";

const PostList = ({ posts }) => {
  if (!posts) {
    return null;
  }

  return (
    <div>
      {posts.map(post => <PostDetail key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;