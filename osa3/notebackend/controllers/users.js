const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('notes', { content: 1, date: 1 });
    res.json(users.map(user => user.toJSON()));
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user.toJSON())
    } else {
        res.status(404).end()
    }
})

usersRouter.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User ({
        username: body.username,
        name: body.name,
        passwordHash,
        notes: [],
    });

    const savedUser = await user.save();
    res.json(savedUser.toJSON());
})

usersRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).end();
})

usersRouter.put('/:id', async (req, res) => {
    const editedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(editedUser);
})

module.exports = usersRouter;
