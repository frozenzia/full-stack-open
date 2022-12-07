// const http = require('http')
const express = require('express')
require('express-async-errors');
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('../utils/config');
const middleware = require('../utils/middleware');
const usersRouter = require('../controllers/users');
const blogsRouter = require('../controllers/blogs');
const loginRouter = require('../controllers/login');

console.log('connecting to: ', config.MONGODB_URI);

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
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('../controllers/test')
    app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
