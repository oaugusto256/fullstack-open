import React from "react";

import PostDetail from "./postDetail";

const PostList = ({ posts, updateBlogPost }) => {
  if (!posts) {
    return null;
  }

  return (
    <>
      {posts.map(post => <PostDetail post={post} key={post.id} updateBlogPost={updateBlogPost} />)}
    </>
  );
};

export default PostList;