const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
        .populate('comments');
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
        .findById(request.params.id)
        .populate('user', { username: 1, name: 1, id: 1 })
        .populate('comments');
    response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const blogBase = { ...request.body };
    const userToUpdate = request.user; // in case of invalid/missing token, never reach here!

    blogBase.user = userToUpdate._id;
    const blog = new Blog(blogBase)
    let savedBlog = await blog.save();

    userToUpdate.blogs.push(savedBlog._id);
    await userToUpdate.save();

    savedBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1, id: 1 }).populate('comments')
    response.status(201).json(savedBlog);
})

blogsRouter.post('/:id/comment', userExtractor, async (request, response) => {
    const commentBase = { ...request.body };
    const blogToUpdate = await Blog.findById(request.params.id)

    commentBase.blog = blogToUpdate._id;
    const comment = new Comment(commentBase)
    let savedComment = await comment.save();

    blogToUpdate.comments.push(savedComment._id);
    await blogToUpdate.save();

    savedComment = await Comment.findById(savedComment.id).populate('blog', { title: 1, id: 1 })
    response.status(201).json(savedComment);
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
        .populate('user', { username: 1, name: 1, id: 1 })
        .populate('comments');
    res.json(resp)
})

module.exports = blogsRouter;
