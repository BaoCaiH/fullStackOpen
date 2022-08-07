const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared the test db')
  // create 2 users
  await api.post('/api/users').send(helper.initialUsers[0])
  await api.post('/api/users').send(helper.initialUsers[1])
  const response = await api.post('/api/login').send(helper.initialUsers[0])
  const token0 = JSON.parse(response.text).token
  await api
    .post('/api/blogs')
    .send(helper.initialBlogs[0])
    .set({ Authorization: `bearer ${token0}` })
  await api
    .post('/api/blogs')
    .send(helper.initialBlogs[1])
    .set({ Authorization: `bearer ${token0}` })

  console.log('initiate db done')
}, 100000)

describe('api_test get blogs', () => {
  test('return the initial blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('2 inital blogs', async () => {
    const response = await api.get('/api/blogs')
    const responseBody = response.body
    expect(responseBody).toHaveLength(helper.initialBlogs.length)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      expect(blog._id).not.toBeDefined()
      expect(blog.id).toBeDefined()
    })
  })

  test('get specific id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    const responseFirstBlog = await api.get(`/api/blogs/${firstBlog.id}`)
    expect(responseFirstBlog.body.title).toEqual(firstBlog.title)
  })
})

describe('api_test post create blogs', () => {
  test('added a blog', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
    const token0 = JSON.parse(loginResponse.text).token
    const newBlog = {
      title: 'title 3',
      url: 'url 3',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token0}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')

    const titles = response.body.map((blog) => blog.title)
    expect(titles).toContain('title 3')
  }, 100000)
  test('likes default to 0', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
    const token0 = JSON.parse(loginResponse.text).token
    const newBlog = {
      title: 'title 4',
      url: 'url 4',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token0}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find((blog) => blog.title === 'title 4')
    expect(addedBlog.likes).toEqual(0)
  }, 100000)
  test('bad request', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
    const token0 = JSON.parse(loginResponse.text).token
    const newBlog = {}
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token0}` })
      .expect(400)
  }, 100000)
  test('unauthorized request', async () => {
    const newBlog = {}
    await api.post('/api/blogs').send(newBlog).expect(401)
  }, 100000)
})

describe('api_test delete blog', () => {
  test('delete specific id', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[0])
    const token0 = JSON.parse(loginResponse.text).token
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set({ Authorization: `bearer ${token0}` })
      .expect(201)
    const firstBlogDeleted = await api.get(`/api/blogs/${firstBlog.id}`)
    expect(firstBlogDeleted.body).toBeNull()
  })
  test('unauthorised delete specific id', async () => {
    const loginResponse = await api
      .post('/api/login')
      .send(helper.initialUsers[1])
    const token1 = JSON.parse(loginResponse.text).token
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .set({ Authorization: `bearer ${token1}` })
      .expect(401)
  })
})

describe('api_test put update blog', () => {
  test('update specific id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    const updateBlog = {
      title: 'title 3',
      url: 'url 3',
      likes: 10,
    }
    await api.put(`/api/blogs/${firstBlog.id}`).send(updateBlog).expect(200)
    const firstBlogUpdated = await api.get(`/api/blogs/${firstBlog.id}`)
    updateBlog['id'] = firstBlog.id
    updateBlog['author'] = firstBlog.author
    expect(firstBlogUpdated.body).toEqual(updateBlog)
  })
})

describe('api_test get users', () => {
  test('return the initial users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('2 inital users', async () => {
    const response = await api.get('/api/users')
    const responseBody = response.body
    expect(responseBody).toHaveLength(helper.initialUsers.length)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/users')
    response.body.forEach((user) => {
      expect(user._id).not.toBeDefined()
      expect(user.id).toBeDefined()
    })
  })

  test('password is not defined', async () => {
    const response = await api.get('/api/users')
    response.body.forEach((user) => {
      expect(user.password).not.toBeDefined()
    })
  })
})

describe('api_test post users', () => {
  test('return new user', async () => {
    const newUser = {
      username: 'someuser',
      name: 'somename',
      password: 'somepassword',
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdUser = response.body
    expect(createdUser.name).toEqual(newUser.name)
    expect(createdUser.password).not.toBeDefined()
  })

  test('reject short username', async () => {
    const newUser = {
      username: 'ab',
      name: 'somename',
      password: 'somepassword',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(JSON.parse(response.text).error).toEqual(
      'username must be at least 3 characters'
    )
  })

  test('reject existing username', async () => {
    const newUser = {
      username: 'username1',
      name: 'somename',
      password: 'somepassword',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(JSON.parse(response.text).error).toEqual('username must be unique')
  })

  test('reject short password', async () => {
    const newUser = {
      username: 'someuser',
      name: 'somename',
      password: 'ab',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)
    expect(JSON.parse(response.text).error).toEqual(
      'password must be at least 3 characters'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})
