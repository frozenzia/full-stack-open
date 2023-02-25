const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const blogBase = { ...request.body };
    const userToUpdate = request.user; // in case of invalid/missing token, never reach here!

    blogBase.user = userToUpdate._id;
    const blog = new Blog(blogBase)
    let savedBlog = await blog.save();

    userToUpdate.blogs.push(savedBlog._id);
    await userToUpdate.save();

    savedBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user; // in case of invalid/missing token, never reach here!
    const blogToDelete = await Blog.findById(req.params.id, 'user');
    if (user._id.toString() !== blogToDelete.user.toString()) {
        return res.status(401).json({ error: 'token invalid' })
    }
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
})

blogsRouter.put('/:id', async (req, res) => {
    const resp = await Blog
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate('user', { username: 1, name: 1, id: 1 });
    res.json(resp)
})

module.exports = blogsRouter;
