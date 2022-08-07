const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'title 1',
    url: 'url 1',
    likes: 1,
  },
  {
    title: 'title 2',
    url: 'url 2',
    likes: 2,
  },
]

const initialUsers = [
  {
    username: 'username1',
    password: 'password1',
    name: 'name1',
  },
  {
    username: 'username2',
    password: 'password2',
    name: 'name2',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremove',
    author: 'removingsoon',
    url: 'remove',
    likes: 0,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
}
