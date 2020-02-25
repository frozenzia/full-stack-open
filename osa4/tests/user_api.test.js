const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../src/app')
const User = require('../models/user');
const userConstants = require('../models/userConstants');
const helper = require('./test_helper');

const api = supertest(app)

// const initialUsers = [
//   {
//     username: 'Start here',
//     name: 'Not required',
//     : 'gotta be a 10-char ',
//   },
// ];

const genericUser = {
  username: 'holymoly',
  name: 'Spede Spede',
  password: 'speedygonzales',
};


beforeEach(async () => {
  // empty db
  await User.deleteMany({});

  // populate db
  // let userObject = null;
  // for (let user of initialUsers) {
  //   userObject = new User(user);
  //   await userObject.save();
  // }
  const usersAfter = await helper.usersInDb()
  expect(usersAfter.length).toEqual(0);
});

// it('get /api/users gives a list of all the users on record', async () => {
//   const response = await api
//     .get('/api/users')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
//   expect(response.body.length === initialUsers.length)
// });
//
// it('users returned have a field "id" (not "_id")', async () => {
//   const response = await api
//     .get('/api/users')
//   expect(response.body[0].id).toBeDefined();
// });

it('can add a user to the database', async () => {
  await api
    .post('/api/users')
    .send(genericUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const usersAfter = await helper.usersInDb()
  expect(usersAfter.length).toEqual(1);
  const usernames = usersAfter.map(b => b.username);
  expect(usernames).toContain(genericUser.username);
});

it('responds with "401 Unauthorized" and proper error if trying to add a user with too short a password', async () => {
  const shortPasswordUser = { ...genericUser };
  shortPasswordUser.password = 'xy';
  const result = await api
    .post('/api/users')
    .send(shortPasswordUser)
    .expect(401);

  expect(result.body.error).toEqual(`Password must be at least ${userConstants.MIN_PASSWORD_LENGTH} characters long`);
});

it('responds with "400 Bad Request" and proper error if trying to add a user with a too short username', async () => {
  const shortUsernameUser = { ...genericUser };
  shortUsernameUser.username = 'xy';

  const result = await api
    .post('/api/users')
    .send(shortUsernameUser)
    .expect(400);

  expect(result.body.error).toContain(`is shorter than the minimum allowed length (${userConstants.MIN_PASSWORD_LENGTH})`);
});

it('responds with "400 Bad Request" and proper error if trying to add a user with non-unique username', async () => {
  await api
    .post('/api/users')
    .send(genericUser);

  const result = await api
    .post('/api/users')
    .send(genericUser)
    .expect(400);

  expect(result.body.error).toContain(`Error, expected \`username\` to be unique.`);
});


// it('succeeds in deleting a specific user', async () => {
//   const response = await api
//     .get('/api/users');
//   const userToDelete = response.body[0];
//   await api
//     .delete(`/api/users/${userToDelete.id}`)
//     .expect(204);
//   const response2 = await api
//     .get('/api/users');
//   expect(response2.body.length).toEqual(initialUsers.length - 1);
// });

afterAll(() => {
  mongoose.connection.close()
})
