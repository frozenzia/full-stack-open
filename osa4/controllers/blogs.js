const blogsRouter = require('express').Router();

const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()))
  } catch(e) {
    next(e);
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const result = await blog.save();
    response.status(201).json(result);
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
