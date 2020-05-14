const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogs');

const initialBlogs = [
  {
    'title': 'Lalala Kamehameha',
    'author': 'Augusto Alves',
    'url': 'http://google.com/wtf',
    'likes': 0
  },
  {
    'title': 'Lalala Kamehameha',
    'author': 'Augusto Alves',
    'url': 'http://google.com/wtf',
    'likes': 13
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe('supertest blogs api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two blog post', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
  });

  test('a valid blog post should be added', async () => {
    const newBlogPost = {
      'title': 'Lalala Kamehameha',
      'author': 'Augusto Alves',
      'url': 'http://google.com/wtf',
      'likes': 1123
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const title = response.body.map(r => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(title).toContain('Lalala Kamehameha');
  });

  test('try to add blog post without without title', async () => {
    const newBlogPost = {
      'author': 'Augusto Alves',
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(400);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});


afterAll(() => {
  mongoose.connection.close();
});