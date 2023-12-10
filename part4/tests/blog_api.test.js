const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogPromises = helper.initialBlogs.map((blog) => new Blog(blog).save());
  await Promise.all(blogPromises);
});

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs unique _id is named id', async () => {
  await api.post('');
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body[0].id).toBeDefined();
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.content);

    expect(contents).not.toContain(blogToDelete.url);
  });
});

test('blog is added to the database correctly', async () => {
  const sample = {
    title: 'Blog Post 69',
    author: 'Author 69',
    url: 'http://example.com/blog69',
    likes: 69,
  };

  await api
    .post('/api/blogs')
    .send(sample)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain('Blog Post 69');
});

test('likes property is set to 0 when not defined in body', async () => {
  const sampleNoLikes = {
    title: 'Blog Post 69',
    author: 'Author 69',
    url: 'http://example.com/blog69',
  };

  const blogToTest = await api
    .post('/api/blogs')
    .send(sampleNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  // const response = await api.get('/api/blogs');
  // const [blogToTest] = response.body.filter((c) => c.title === 'Blog Post 69');
  expect(blogToTest.body.likes).toBe(0);
});
test('missing title returns 400', async () => {
  const sampleNoLikes = {
    title: 'Blog Post 69',
    author: 'Author 69',
  };

  await api.post('/api/blogs').send(sampleNoLikes).expect(400);
});
test('missing url returns 400', async () => {
  const sampleNoLikes = {
    author: 'Author 69',
    url: 'http://example.com/blog69',
  };

  await api.post('/api/blogs').send(sampleNoLikes).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
