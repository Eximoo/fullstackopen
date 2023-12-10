const Blog = require('../models/blog');

const initialBlogs = [
  {
    id: '65748827b1da0876a70507e2',
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
    url: 'http://example.com/blog4',
    likes: 40,
  },
];
const nonExistingId = async () => {
  const blog = new Blog({
    title: 'nonExistingTest',
    url: 'http://example.com/nonExistingTest',
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
module.exports = { initialBlogs, blogsInDb, nonExistingId };
