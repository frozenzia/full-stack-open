const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const config = require('./utils/config');
const notesRouter = require('./controllers/notes');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
// const errorHandler = require('./errorHandler');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

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

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
