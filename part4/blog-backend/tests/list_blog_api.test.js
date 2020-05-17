const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blogs');

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  const postObjects = helper.initialPosts.map(post => new Blog(post));
  const promiseArray = postObjects.map(post => post.save());
  await Promise.all(promiseArray);

  console.log('done');
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
    expect(response.body).toHaveLength(helper.initialPosts.length);
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

    expect(response.body).toHaveLength(helper.initialPosts.length + 1);
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
    expect(response.body).toHaveLength(helper.initialPosts.length);
  });
});


afterAll(() => {
  mongoose.connection.close();
});