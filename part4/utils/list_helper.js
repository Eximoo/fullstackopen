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

module.exports = { dummy, totalLikes, favoriteBlog };
