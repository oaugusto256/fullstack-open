const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedBlogPost = await blog.save();
    response.json(savedBlogPost.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;