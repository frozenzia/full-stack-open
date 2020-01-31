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

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

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

app.post('/api/notes', (req,res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then(savedNote => {
    res.json(savedNote.toJSON())
  })
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
