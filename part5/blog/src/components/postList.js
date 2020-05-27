import React from "react";

import PostDetail from "./postDetail";

const PostList = ({ posts, updateBlogPost, deleteBlogPost }) => {
  if (!posts) {
    return null;
  }

  const postsSortByLikes = posts.sort((a, b) => b.likes - a.likes);

  return (
    <>
      {postsSortByLikes.map(post =>
        <PostDetail
          post={post}
          key={post.id}
          updateBlogPost={updateBlogPost}
          deleteBlogPost={deleteBlogPost}
        />
      )}
    </>
  );
};

export default PostList;