const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../src/app')
const Blog = require('../models/blog');
const User = require('../models/user');
// const helper = require('./test_helper');

const api = supertest(app)

// const initialNotes = helper.initialNotes;
const initialBlogs = [
  {
    title: 'Start here',
    author: 'Not required',
    url: 'gotta be a 10-char url',
    likes: 4,
  },
  {
    title: 'Middle o\' nowhere',
    author: 'Laust',
    url: 'y.a.c.k.holymancollege',
    likes: 2,
  },
  {
    title: 'End here',
    url: 'why do you think this is an url?',
    likes: 1,
  },
];
const genericBlog = {
  title: 'Lonely writer',
  author: 'SpedeSpede',
  url: 'www.fi.fi.fi.fi.fi.fi.fi',
  likes: 8,
};
const genericUser = {
  name: 'Ben',
  username: 'bstiller',
  password: 'benIsBest',
};
let token = null;

beforeEach(async () => {
  // empty dbs
  await Blog.deleteMany({});
  await User.deleteMany({});

  // populate dbs
  // initial blogs
  await Blog.insertMany(initialBlogs);
  // initial user exists and logs in...
  await api.post('/api/users').send(genericUser);
  const resp = await api.post('/api/login').send(genericUser);
  token = resp.body.token;
});

it('get /api/blogs gives a list of all the blogs on record', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(initialBlogs.length)
});

it('blogs returned have a field "id" (not "_id")', async () => {
  const response = await api
    .get('/api/blogs')
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

it('canNOT add a blog to the database if it does NOT include token in header', async () => {
  const addedBlogResponse = await api
    .post('/api/blogs')
    .send(genericBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
  expect(addedBlogResponse.body.error).toEqual('token missing or invalid');
});

it('can add a blog to the database IF it includes token in header', async () => {
  const addedBlogResponse = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(genericBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const addedBlogId = addedBlogResponse.body.id;
  const response = await api
    .get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  const titles = response.body.map(b => b.title);
  expect(titles).toContain(genericBlog.title);
  const lastBlog = response.body[response.body.length - 1];
  expect(lastBlog.user).toBeDefined();
  const user = await User.findById(lastBlog.user.id);
  expect(user.username).toEqual(genericUser.username);
  const blogsAsStrings = user.blogs.map(b => b.toString());
  expect(blogsAsStrings).toContain(addedBlogId.toString());
});

it('blogs returned, if they have user info, will list username, name and id of users', async () => {
  // want to add at least one blog with the api, so that
  // it gets user info
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(genericBlog);
  const response = await api.get('/api/blogs')
  const lastBlog = response.body[response.body.length - 1];
  expect(lastBlog.user).toBeDefined();
  expect(lastBlog.user.username).toBeDefined();
  expect(lastBlog.user.name).toBeDefined();
  expect(lastBlog.user.id).toBeDefined();
  expect(response.body[0].id).toBeDefined();
});

it('fills in value 0 if no "likes" field is included when adding a blog to the database', async () => {
  const newBlog = { ... genericBlog };
  delete newBlog.likes;
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const response = await api
    .get('/api/blogs')
  const titles = response.body.map(b => b.title);
  const addedBlogIndex = titles.indexOf(newBlog.title);
  expect(response.body[addedBlogIndex].likes).toBeDefined();
  expect(response.body[addedBlogIndex].likes).toEqual(0);
});

it('responds with "400 Bad request" if trying to add a blog without a title and an url', async () => {
  const titlelessBlog = new Blog({
    url: 'www.fi.fi.fi.fi.fi.fi.fi',
  });
  const urllessBlog = new Blog({
    title: 'Lonely writer',
  });
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(titlelessBlog)
    .expect(400)
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(urllessBlog)
    .expect(400)
});

it('FAILS in deleting a specific blog if no token sent', async () => {
  const response = await api
    .get('/api/blogs');
  const blogToDelete = response.body[0];
  const deletedBlogResponse = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  expect(deletedBlogResponse.body.error).toEqual('token missing or invalid');
});

it('FAILS in deleting a specific blog if WRONG token sent', async () => {
  // we need a blog with a token, so add one for the genericUser...
  const resp = await api
    .post('/api/blogs')
    .set('authorization', `bearer ${token}`)
    .send(genericBlog);
  const blogToDelete = resp.body;

  // also need a 2nd user
  const newUser = { ...genericUser };
  newUser.username = `${genericUser.username}2`;
  const resp2 = await api.post('/api/users').send(newUser);

  const deletedBlogResponse = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('authorization', `bearer ${resp2.token}`)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  expect(deletedBlogResponse.body.error).toEqual('invalid token');
});

it('succeeds in deleting a specific blog when proper token sent', async () => {
  // we need a blog with a token, so add one for the genericUser...
  const resp = await api
    .post('/api/blogs')
    .set('authorization', `bearer ${token}`)
    .send(genericBlog);
  const blogToDelete = resp.body;
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('authorization', `bearer ${token}`)
    .expect(204);
  const response2 = await api
    .get('/api/blogs');
  expect(response2.body).toHaveLength(initialBlogs.length);
});

it('succeeds in editing "likes" field for a specific blog', async () => {
  const response = await api
    .get('/api/blogs');
  const blogToEdit = response.body[0];
  const id = blogToEdit.id;
  const editedBlog = new Blog(blogToEdit);
  editedBlog.likes += 1;
  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(editedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  const response2 = await api
    .get('/api/blogs');
  const blogs = response2.body;
  expect(blogs[blogs.findIndex(b => b.id === id)].likes).toEqual(blogToEdit.likes + 1);
});

afterAll(() => {
  mongoose.connection.close()
})
