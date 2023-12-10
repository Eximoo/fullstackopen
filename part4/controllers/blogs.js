const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  console.log(request.params.id);
  const blogs = await Blog.find({});
  console.log(blogs, 'blogs');
  const result = await Blog.deleteOne({ _id: request.params.id });
  console.log(result, 'results');
  if (result.deletedCount === 1) {
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

module.exports = blogsRouter;
