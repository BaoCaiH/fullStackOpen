const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author')
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('author')
  response.json(blog)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.userId)
  const existingBlog = await Blog.findOne({ title: body.title })

  if (existingBlog) {
    return response.status(400).json({
      error: 'blog already exists',
    })
  }

  // replace author with id
  const blog = new Blog(body)
  blog.author = user._id
  const result = await blog.save()

  // update user's blog list
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog.author._id.toString() !== request.userId) {
      return response
        .status(401)
        .json({ error: 'only the author can delete the blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(201).json()
  }
)

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
  response.json(updatedBlog)
})

module.exports = blogRouter
