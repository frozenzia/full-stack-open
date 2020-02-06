const notesRouter = require('express').Router();

const Note = require('../models/note');

// notesRouter.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>')
// })

notesRouter.get('/', (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes.map(note => note.toJSON()));
    });
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error));
})

notesRouter.post('/', (req,res, next) => {
  const body = req.body;

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => res.json(savedAndFormattedNote))
    .catch(error => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((resp) => {
      res.json(resp.toJSON())
    })
    .catch(error => next(error))
})

module.exports = notesRouter;
