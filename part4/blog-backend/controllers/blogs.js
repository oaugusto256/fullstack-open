const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blogs');
const User = require('../models/user');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

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
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const post = { ...body };

  const result = await Blog.findByIdAndUpdate(request.params.id, post, { new: true });
  return response.json(result.toJSON());
});

module.exports = blogsRouter;