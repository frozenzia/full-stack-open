const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users.map(user => user.toJSON()))
  } catch(e) {
    next(e);
  }
})

usersRouter.post('/', async ({ body }, response, next) => {
  try {
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
