// const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('../utils/config');
const middleware = require('../utils/middleware');
const usersRouter = require('../controllers/users');
const blogsRouter = require('../controllers/blogs');

console.log('connecting to: ', config.MONGODB_URI);

// Make Mongoose use `findOneAndUpdate()`. Note that this option
// is `true` by default, so you need to set it to false.
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB, error: ', error.message);
  });

const app = express()

// use middleware
app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
