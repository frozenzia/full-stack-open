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
const genericUser = {
  name: 'Ben',
  username: 'bstiller',
  password: 'benIsBest',
};

beforeEach(async () => {
  // empty dbs
  await Blog.deleteMany({});
  await User.deleteMany({});

  // populate dbs
  let blogObject = null;
  for (let blog of initialBlogs) {
    blogObject = new Blog(blog);
    await blogObject.save();
  }
  await api.post('/api/users').send(genericUser);
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
  const newBlog = {
    title: 'Lonely writer',
    author: 'SpedeSpede',
    url: 'www.fi.fi.fi.fi.fi.fi.fi',
    likes: 8,
  };
  const addedBlogResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const addedBlogId = addedBlogResponse.body.id;
  const response = await api
    .get('/api/blogs')
  expect(response.body.length).toEqual(initialBlogs.length + 1);
  const titles = response.body.map(b => b.title);
  expect(titles).toContain('Lonely writer');
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
  const newBlog = { ...initialBlogs[0] };
  newBlog.likes = 50;
  await api.post('/api/blogs').send(newBlog);
  const response = await api.get('/api/blogs')
  const lastBlog = response.body[response.body.length - 1];
  expect(lastBlog.user).toBeDefined();
  expect(lastBlog.user.username).toBeDefined();
  expect(lastBlog.user.name).toBeDefined();
  expect(lastBlog.user.id).toBeDefined();
  expect(response.body[0].id).toBeDefined();
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

it('succeeds in deleting a specific blog', async () => {
  const response = await api
    .get('/api/blogs');
  const blogToDelete = response.body[0];
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);
  const response2 = await api
    .get('/api/blogs');
  expect(response2.body.length).toEqual(initialBlogs.length - 1);
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
