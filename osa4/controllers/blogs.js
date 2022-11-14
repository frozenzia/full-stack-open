const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 });
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blogBase = { ...request.body };
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
})

blogsRouter.delete('/:id', async (req, res) => {
    const decodedToken = req.token
        ? jwt.verify(req.token, process.env.SECRET)
        : null;
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const blogToDelete = await Blog.findById(req.params.id, 'user');
    if (decodedToken.id !== blogToDelete.user.toString()) {
        return res.status(401).json({ error: 'token invalid' })
    }
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
})

blogsRouter.put('/:id', async (req, res) => {
    const resp = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resp)
})

module.exports = blogsRouter;
