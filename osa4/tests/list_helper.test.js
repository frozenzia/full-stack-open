const listHelper = require('../utils/list_helper');

it('dummy returns one', () => {
  const blogs = [];
  expect(listHelper.dummy(blogs)).toBe(1);
});
