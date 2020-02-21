const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('notes', { content: 1, date: 1 });
  res.json(users.map(user => user.toJSON()));
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception);
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
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
  } catch(exception) {
    next(exception);
  }
})

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch(exception) {
    next(exception);
  }
})

usersRouter.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((resp) => {
      res.json(resp.toJSON())
    })
    .catch(error => next(error))
})

module.exports = usersRouter;
