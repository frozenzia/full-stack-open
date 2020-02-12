const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// const noteSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     minlength: 5,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   important: Boolean,
// });
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema); // store in collection 'blogs' (1st param, lowercase plural!)
