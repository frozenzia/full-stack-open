const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

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

blogsRouter.post('/', async (request, response, next) => {
  const blogBase = { ...request.body };
  try {
    const decodedToken = request.token
      ? jwt.verify(request.token, process.env.SECRET)
      : null;
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userToUpdate = await User.findById(decodedToken.id);

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
