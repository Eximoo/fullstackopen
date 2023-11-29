const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Blog Post 1',
    author: 'Author 1',
    url: 'http://example.com/blog1',
    likes: 10,
  },
  {
    title: 'Blog Post 2',
    author: 'Author 2',
    url: 'http://example.com/blog2',
    likes: 20,
  },
  {
    title: 'Blog Post 3',
    author: 'Author 3',
    url: 'http://example.com/blog3',
    likes: 30,
  },
  {
    title: 'Blog Post 4',
    author: 'Author 4',
    url: 'http://example.com/blog7',
    likes: 40,
  },
];

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});
beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[2]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[3]);
  await noteObject.save();
});
afterAll(async () => {
  await mongoose.connection.close();
});
