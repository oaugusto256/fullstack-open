const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  const currFavorite = (acc, curr) => {
    if (curr.likes >= acc.likes) {
      return curr;
    }

    return acc;
  };

  return blogs.length === 0
    ? 0
    : blogs.reduce(currFavorite, { likes: 0 });
};

const mostBlogs = (blogs) => {
  const createUniqueAuthorListWithBlogCount = (acc, curr) => {
    if (curr.author in acc) {
      acc[curr.author] = {
        blogs: acc[curr.author].blogs + 1
      };
      return acc;
    }

    acc[curr.author] = { blogs: 1 };
    return acc;
  };

  const getAuthorWithMostBlogs = (authorsBlogsCountObject) => {
    let authorAuxObject = {
      author: '',
      blogs: 0,
    };

    for (const [key, value] of Object.entries(authorsBlogsCountObject)) {
      if (value.blogs >= authorAuxObject.blogs) {
        authorAuxObject = {
          author: key,
          blogs: value.blogs
        };
      }
    }

    return authorAuxObject;
  };

  const authorsWithBlogCount = blogs.reduce(createUniqueAuthorListWithBlogCount, {});
  return getAuthorWithMostBlogs(authorsWithBlogCount);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};