const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('method: ', req.method);
        console.log('path: ', req.path);
        console.log('body: ', req.body);
        console.log('---');
    }
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error('in the errorHandler!', error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' });
    }

    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7); // part AFTER 'bearer '
    }
    next();
}

const userExtractor = async (req, res, next) => {
    const decodedToken = req.token
        ? jwt.verify(req.token, process.env.SECRET)
        : null;
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    req.user = await User.findById(decodedToken.id);
    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
