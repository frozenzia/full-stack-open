const listHelper = require('../utils/list_helper');

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

it('dummy returns one', () => {
    const blogs = [];
    expect(listHelper.dummy(blogs)).toBe(1);
});

describe('totalLikes', () => {
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

describe('favoriteBlog', () => {
    it('of empty array is {}', () => {
        expect(listHelper.favoriteBlog([])).toEqual({});
    });
    it('of array with single item is that item, EVEN if item has no likes', () => {
        const singleItemArray = [sampleBlogs[2]]; // no likes at all
        expect(listHelper.favoriteBlog(singleItemArray)).toEqual(sampleBlogs[2]);
    });
    it('of array with multiple items calculates correctly, EVEN if some item has no `likes` key.', () => {
        expect(listHelper.favoriteBlog(sampleBlogs)).toEqual(sampleBlogs[1]);
    });
});

describe('mostBlogs', () => {
    it('of empty array is {}', () => {
        expect(listHelper.mostBlogs([])).toEqual({});
    });
    it('of array with single item is object with that item\'s `author`, and `blogs` set to 1', () => {
        const singleItemArray = [sampleBlogs[1]]; // no likes at all
        expect(listHelper.mostBlogs(singleItemArray)).toEqual({ author: sampleBlogs[1].author, blogs: 1 });
    });
    const largerSampleBlogs = [...sampleBlogs, ...sampleBlogs, sampleBlogs[0], sampleBlogs[1]];
    // "haa" and "hoo" authors should both have 3 blogs, haa comes 1st, so...
    it('of array with multiple items calculates correctly', () => {
        expect(listHelper.mostBlogs(largerSampleBlogs)).toEqual({ author: 'haa', blogs: 3 });
    });
});

describe('mostLikes', () => {
    it('of empty array is {}', () => {
        expect(listHelper.mostLikes([])).toEqual({});
    });
    it('of array with single item is that item, but only with `author` and `likes` keys, WITH `likes` key present', () => {
        const singleItemArray = [sampleBlogs[1]]; // no likes at all
        expect(listHelper.mostLikes(singleItemArray)).toEqual({ author: sampleBlogs[1].author, likes: sampleBlogs[1].likes || 0 });
    });
    it('of array with single item is that item, but only with `author` and `likes` keys, WITHOUT `likes` key present', () => {
        const singleItemArray = [sampleBlogs[2]]; // no likes at all
        expect(listHelper.mostLikes(singleItemArray)).toEqual({ author: sampleBlogs[2].author, likes: sampleBlogs[2].likes || 0 });
    });
    const largerSampleBlogs = [...sampleBlogs, ...sampleBlogs, sampleBlogs[0], sampleBlogs[1]];
    // "haa" and "hoo" authors should both have 3 blogs, but "hoo" should have 6 likes
    it('of array with multiple items calculates correctly', () => {
        expect(listHelper.mostLikes(largerSampleBlogs)).toEqual({ author: 'hoo', likes: 6 });
    });
});
