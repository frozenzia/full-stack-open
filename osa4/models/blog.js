const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true,
    },
    author: {
        type: String,
        minlength: 3,
    },
    url: {
        type: String,
        minlength: 10,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
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
