const express = require('express')
require ('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const config = require('./utils/config');
const loginRouter = require('./controllers/login');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
// const errorHandler = require('./errorHandler');

logger.info('connecting to: ', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB, error: ', error.message);
    });

const app = express();
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
