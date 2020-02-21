const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user');
const helper = require('./test_helper');

// const initialUsers = helper.initialUsers;

const api = supertest(app)

describe('WHEN there is initially one user in db', () => {
  beforeEach(async () => {
    // empty db
    await User.deleteMany({});

    // populate db
    const user = new User({ username: 'root', password: 'secret' });
    await user.save();
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
});
// describe('WHEN there are initially some users saved', () => {
//   beforeEach(async () => {
//   // empty db
//     await User.deleteMany({});
//
//     // populate db
//     let userObject = null;
//     for (let user of initialUsers) {
//       userObject = new User(user);
//       await userObject.save();
//     }
//
//   });
//
//   test('users are returned as json', async () => {
//     await api
//       .get('/api/users')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   })
//
//   test('all users are returned', async () => {
//     const response = await api.get('/api/users')
//
//     expect(response.body.length).toBe(initialUsers.length)
//   })
//
//   test('a specific user is in the returned users', async () => {
//     const response = await api.get('/api/users')
//     const contents = response.body.map(body => body.content);
//     expect(contents).toContain(initialUsers[1].content);
//   })
//
//   describe('WHEN viewing a specific user', () => {
//     it('a specific user can be fetched with a valid id', async () => {
//       const usersAtStart = await helper.usersInDb();
//       const userToFind = usersAtStart[0];
//
//       const fetchedUser = await api
//         .get(`/api/users/${userToFind.id}`)
//         .expect(200)
//         .expect('Content-Type', /application\/json/);
//
//       expect(fetchedUser.body).toEqual(userToFind);
//     });
//
//     it('fails with statuscode 404 if user does not exist', async () => {
//       const validNonexistingId = await helper.nonExistingId()
//
//       await api
//         .get(`/api/users/${validNonexistingId}`)
//         .expect(404)
//     })
//
//     it('fails with statuscode 400 id is invalid', async () => {
//       const invalidId = '5a3d5da59070081a82a3445' // 1 digit too short
//
//       await api
//         .get(`/api/users/${invalidId}`)
//         .expect(400)
//     })
//   });
//
//   describe('WHEN adding a new user', () => {
//     it('a valid user can be added ', async () => {
//       const newUser = {
//         content: 'here is a new user',
//         important: true,
//       };
//       await api
//         .post('/api/users')
//         .send(newUser)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//
//       const usersAfterwards = await helper.usersInDb();
//       expect(usersAfterwards.length).toBe(initialUsers.length + 1);
//       const contents = usersAfterwards.map(n => n.content);
//       expect(contents).toContain('here is a new user');
//     });
//
//     it('an invalid user is NOT added and fails with code 400', async () => {
//       const newUser = {
//         // content: WHOOPS! Leaving out a required field!!!
//         important: true,
//       };
//       await api
//         .post('/api/users')
//         .send(newUser)
//         .expect(400)
//
//       const usersAfterwards = await helper.usersInDb();
//       expect(usersAfterwards.length).toBe(initialUsers.length);
//     });
//
//   });
//   describe('WHEN deleting a user', () => {
//     it('a user can be deleted and succeeds with 204 if valid id', async () => {
//       const usersAtStart = await helper.usersInDb();
//       const userToDelete = usersAtStart[0];
//
//       await api
//         .delete(`/api/users/${userToDelete.id}`)
//         .expect(204)
//
//       const usersAfterwards = await helper.usersInDb();
//       expect(usersAfterwards.length).toBe(initialUsers.length - 1);
//
//       const contents = usersAfterwards.map(n => n.content);
//       expect(contents).not.toContain(userToDelete.content);
//     });
//
//   });
// });

afterAll(() => {
  mongoose.connection.close()
})
