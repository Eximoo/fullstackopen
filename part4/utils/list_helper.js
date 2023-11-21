// eslint-disable-next-line no-unused-vars
const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });
  return sum;
};
/**
 * @param {Array} blogs blogs
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let fav = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > fav.likes) {
      fav = blog;
    }
  });

  return { title: fav.title, author: fav.author, likes: fav.likes };
};
/**
 *
 * @param {Array} blogs
 */
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let top = { highest: 1, index: 0 };
  let authors = [
    {
      author: blogs[0].author,
      blogs: 0,
    },
  ];

  blogs.forEach((blog) => {
    let found = false;
    authors.forEach((entry, i) => {
      if (entry.author === blog.author) {
        authors[i].blogs = authors[i].blogs + 1;
        found = true;
        if (authors[i].blogs > top.highest) {
          top.index = i;
        }
      }
    });
    if (!found) {
      authors.push({ author: blog.author, blogs: 1 });
    }
  });
  return authors[top.index];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let top = { highest: blogs[0].likes, index: 0 };
  let authors = [];

  blogs.forEach((blog) => {
    let found = false;
    authors.forEach((entry, i) => {
      if (entry.author === blog.author) {
        authors[i].likes = authors[i].likes + blog.likes;
        found = true;
        if (authors[i].likes > top.highest) {
          top.index = i;
        }
      }
    });

    if (!found) {
      authors.push({ author: blog.author, likes: blog.likes });
    }
  });
  console.log(authors, top.index);
  return authors[top.index];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
