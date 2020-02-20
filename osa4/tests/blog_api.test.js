const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../src/app')
const Blog = require('../models/blog');
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


beforeEach(async () => {
  // empty db
  await Blog.deleteMany({});

  // populate db
  let blogObject = null;
  for (let blog of initialBlogs) {
    blogObject = new Blog(blog);
    await blogObject.save();
  }

});

it('get /api/blogs gives a list of all the blogs on record', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body.length === initialBlogs.length)
});

it('blogs returned have a field "id" (not "_id")', async () => {
  const response = await api
    .get('/api/blogs')
  expect(response.body[0].id).toBeDefined();
});

it('can add a blog to the database', async () => {
  const newBlog = new Blog({
    title: 'Lonely writer',
    author: 'SpedeSpede',
    url: 'www.fi.fi.fi.fi.fi.fi.fi',
    likes: 8,
  });
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const response = await api
    .get('/api/blogs')
  expect(response.body.length).toEqual(initialBlogs.length + 1);
  const titles = response.body.map(b => b.title);
  expect(titles).toContain('Lonely writer');
});

it('fills in value 0 if no "likes" field is included when adding a blog to the database', async () => {
  const newBlog = new Blog({
    title: 'Lonely writer',
    url: 'www.fi.fi.fi.fi.fi.fi.fi',
  });
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const response = await api
    .get('/api/blogs')
  const titles = response.body.map(b => b.title);
  const addedBlogIndex = titles.indexOf('Lonely writer');
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
    .send(titlelessBlog)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(urllessBlog)
    .expect(400)
});

afterAll(() => {
  mongoose.connection.close()
})
