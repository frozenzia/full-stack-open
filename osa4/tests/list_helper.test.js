const listHelper = require('../utils/list_helper');

it('dummy returns one', () => {
  const blogs = [];
  expect(listHelper.dummy(blogs)).toBe(1);
});

describe('totalLikes', () => {
  const sampleBlogs = [
    {
      title: "oneLike",
      author: "haa",
      url: "https://uta.fi",
      likes: 1,
      id: "5e43c32039a51635bc8842f1"
    },
    {
      title: "twoLikes",
      author: "hoo",
      url: "https://tuni.fi",
      likes: 2,
      id: "5e43c8a339a51635bc8842f2"
    },
    {
      title: "noLikesKeyAtAll",
      author: "def",
      url: "https://npr.org",
      id: "5e43d985a0bce73e0b10da42"
    },
  ];
  it('of empty array is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  it('of array with single item is like of that item', () => {
    const singleItemArray = [sampleBlogs[1]]; // "twoLikes"
    expect(listHelper.totalLikes(singleItemArray)).toBe(2);
  });
  it('of array with multiple items calculates correctly, EVEN if some item has no `likes` key.', () => {
    expect(listHelper.totalLikes(sampleBlogs)).toBe(3);
  });
});
