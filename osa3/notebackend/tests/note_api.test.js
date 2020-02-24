const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Note = require('../models/note');
const User = require('../models/user');
const helper = require('./test_helper');

const initialNotes = helper.initialNotes;

const api = supertest(app)

let token = null;

describe('WHEN there are initially some notes saved', () => {
  beforeEach(async () => {
  // empty db
    await Note.deleteMany({});

    // populate db
    let noteObject = null;
    for (let note of initialNotes) {
      noteObject = new Note(note);
      await noteObject.save();
    }

    // For note creation (and later deletion), we must first log in
    // in order to get a token, which will be used during note creation.
    // empty User database and create a new user
    await User.deleteMany({});
    const user = { username: 'temp', password: 'something' };

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // now log in
    const resp = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    token = resp.body.token;
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

  describe('WHEN viewing a specific note', () => {
    it('a specific note can be fetched with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToFind = notesAtStart[0];

      const fetchedNote = await api
        .get(`/api/notes/${noteToFind.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(fetchedNote.body).toEqual(noteToFind);
    });

    it('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    it('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445' // 1 digit too short

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  });

  describe('WHEN adding a new note', () => {
    it('a valid note can be added ', async () => {
      const newNote = {
        content: 'here is a new note',
        important: true,
      };
      await api
        .post('/api/notes')
        .set('Authorization', `bearer ${token}`)
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const notesAfterwards = await helper.notesInDb();
      expect(notesAfterwards.length).toBe(initialNotes.length + 1);
      const contents = notesAfterwards.map(n => n.content);
      expect(contents).toContain('here is a new note');
    });

    it('an invalid note is NOT added and fails with code 400', async () => {
      const newNote = {
        // content: WHOOPS! Leaving out a required field!!!
        important: true,
      };
      await api
        .post('/api/notes')
        .set('Authorization', `bearer ${token}`)
        .send(newNote)
        .expect(400)

      const notesAfterwards = await helper.notesInDb();
      expect(notesAfterwards.length).toBe(initialNotes.length);
    });

  });
  describe('WHEN deleting a note', () => {
    it('a note can be deleted and succeeds with 204 if valid id', async () => {
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

  });
});

afterAll(() => {
  mongoose.connection.close()
})
