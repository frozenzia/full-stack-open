require('dotenv').config()
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const errorHandler = require('./errorHandler');
const Note = require('./models/note');

const app = express();
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes.map(note => note.toJSON()));
    });
})

app.get('/api/notes/:id', (req, res, next) => {
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

app.post('/api/notes', (req,res, next) => {
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

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((resp) => {
      res.json(resp.toJSON())
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(errorHandler);
