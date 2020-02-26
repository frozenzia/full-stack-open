const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(e) {
    next(e);
  }
})

blogsRouter.post('/', async ({ body }, response, next) => {
  const blogBase = { ...body };
  try {
    const users = await User.find({});
    const userToUpdate = users[0];

    blogBase.user = userToUpdate._id;
    const blog = new Blog(blogBase)
    const savedBlog = await blog.save();

    userToUpdate.blogs.push(savedBlog._id);
    await userToUpdate.save();

    response.status(201).json(savedBlog);
  } catch(e) {
    next(e);
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch(exception) {
    next(exception);
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const resp = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resp.toJSON())
  } catch(e) {
    next(e);
  }
})

module.exports = blogsRouter;
