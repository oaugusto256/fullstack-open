const blogsRouter = require('express').Router();

const Blog = require('../models/blogs');
const User = require('../models/user');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({ ...body, user: user._id });

  const savedBlogPost = await blog.save();
  user.blogs = user.blogs.concat(savedBlogPost._id);
  await user.save();

  response.json(savedBlogPost.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;