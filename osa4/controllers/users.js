const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const userConstants = require('../models/userConstants');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, url: 1, author: 1 });
    response.json(users.map(user => user.toJSON()))
  } catch(e) {
    next(e);
  }
})

usersRouter.post('/', async ({ body }, response, next) => {
  try {
    if(body.password.length < userConstants.MIN_PASSWORD_LENGTH) {
      return response.status(401).json({ error: `Password must be at least ${userConstants.MIN_PASSWORD_LENGTH} characters long` });
    }

    const newUser = {
      ...body
    };
    const saltRounds = 10;
    newUser.passwordHash = await bcrypt.hash(body.password, saltRounds);
    delete newUser.password;

    const user = new User(newUser)
    const result = await user.save();
    response.status(201).json(result.toJSON());
  } catch(e) {
    next(e);
  }
})

// usersRouter.delete('/:id', async (req, res, next) => {
//   try {
//     await User.findByIdAndRemove(req.params.id);
//     res.status(204).end();
//   } catch(exception) {
//     next(exception);
//   }
// })
//
// usersRouter.put('/:id', async (req, res, next) => {
//   try {
//     const resp = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(resp.toJSON())
//   } catch(e) {
//     next(e);
//   }
// })

module.exports = usersRouter;
