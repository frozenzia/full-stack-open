const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userConstants = require('../models/userConstants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    minlength: userConstants.MIN_USERNAME_LENGTH,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema); // store in collection 'blogs' (1st param, lowercase plural!)
