const Blog = require('../models/blogs');

const initialPosts = [
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

const nonExistingId = async () => {
  const post = new Blog({ title: 'willremovethissoon' });
  await post.save();
  await post.remove();

  return post._id.toString();
};

const postsInDb = async () => {
  const posts = await Blog.find({});
  return posts.map(post => post.toJSON());
};

module.exports = {
  initialPosts, nonExistingId, postsInDb
};
