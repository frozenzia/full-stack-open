const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7); // part AFTER 'bearer '
    }
    return null;
}

notesRouter.get('/', async (req, res) => {
    const notes = await Note
        .find({})
        .populate('user', { name: 1 });
    res.json(notes);
})

notesRouter.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

notesRouter.post('/', async (req, res) => {
    const body = req.body;

    const token = getTokenFrom(req);

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id)
    await user.save();
    res.status(201).json(savedNote);
})

notesRouter.delete('/:id', async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);
    res.status(204).end();
})

notesRouter.put('/:id', async (req, res) => {
    const resp = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resp);
})

module.exports = notesRouter;
