const listHelper = require('../utils/list_helper');
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];
const listWithMultipleBlogs = [
  {
    _id: '5a422aa71b54a676234d17f4',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    title: 'Considered Harmful',
    author: 'Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 111,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To ',
    author: 'Edsger ',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

test('dummy return one', () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test('if a list with multiple blogs is calcualted right', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(128);
  });
});

describe('favoriteBlog', () => {
  test('when no blogs are provided', () => {
    expect(listHelper.favoriteBlog([])).toEqual(0);
  });
  test('when one blog is provided, return title author likes of that blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('when multiple blogs are passed, return title author likes of most liked blog', () => {
    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual({
      title: 'Considered Harmful',
      author: 'Dijkstra',
      likes: 111,
    });
  });
});
