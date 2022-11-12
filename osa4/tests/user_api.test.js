const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../src/app')
const User = require('../models/user');
const Blog = require('../models/blog');
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
    // empty dbs
    await User.deleteMany({});
    await Blog.deleteMany({});

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
    expect(usersAfter[0].username).toContain(genericUser.username);
    expect(usersAfter[0].blogs).toBeDefined();
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

test('fetching users returns a list that has also populated the blogs section of a user', async () => {
    // create single, generic user to db
    await api
        .post('/api/users')
        .send(genericUser);
    // log him in
    const resp = await api.post('/api/login').send(genericUser);
    const token = resp.body.token;

    // create a blog which will be assigned to the 1st (and only) user in the db
    const newBlog = {
        title: 'Lonely writer',
        author: 'SpedeSpede',
        url: 'www.fi.fi.fi.fi.fi.fi.fi',
        likes: 8,
    };
    const addedBlogResponse = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog);
    const blogId = addedBlogResponse.body.id.toString();
    const users = await api
        .get('/api/users');
    expect(users.body[0].blogs[0].title).toEqual(newBlog.title);
    expect(users.body[0].blogs[0].id).toEqual(blogId);
})

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
