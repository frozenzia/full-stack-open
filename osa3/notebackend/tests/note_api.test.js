const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Note = require('../models/note');
const helper = require('./test_helper');

const initialNotes = helper.initialNotes;

const api = supertest(app)


beforeEach(async () => {
  // empty db
  await Note.deleteMany({});

  // populate db
  let noteObject = null;
  for (let note of initialNotes) {
    noteObject = new Note(note);
    await noteObject.save();
  }

});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body.length).toBe(initialNotes.length)
})

test('a specific note is in the returned notes', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(body => body.content);
  expect(contents).toContain(initialNotes[1].content);
})

it('a valid note can be added ', async () => {
  const newNote = {
    content: 'here is a new note',
    important: true,
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const notesAfterwards = await helper.notesInDb();
  expect(notesAfterwards.length).toBe(initialNotes.length + 1);
  const contents = notesAfterwards.map(n => n.content);
  expect(contents).toContain('here is a new note');
});

it('an invalid note is NOT added ', async () => {
  const newNote = {
    // content: WHOOPS! Leaving out a required field!!!
    important: true,
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAfterwards = await helper.notesInDb();
  expect(notesAfterwards.length).toBe(initialNotes.length);
});

it('a specific note can be fetched', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToFind = notesAtStart[0];

  const fetchedNote = await api
    .get(`/api/notes/${noteToFind.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(fetchedNote.body).toEqual(noteToFind);
});

it('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAfterwards = await helper.notesInDb();
  expect(notesAfterwards.length).toBe(initialNotes.length - 1);

  const contents = notesAfterwards.map(n => n.content);
  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(() => {
  mongoose.connection.close()
})
