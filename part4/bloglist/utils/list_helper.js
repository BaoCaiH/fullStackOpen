const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .map((blog) => blog.likes)
    .reduce((total, like) => total + like, 0)
}

const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce((current, next) =>
    next.likes > current.likes ? next : current
  )
  return favourite
}

const mostBlogs = (blogs) => {
  const authorBlogs = _.countBy(blogs, 'author')
  const authorMostBlogs = _.findKey(authorBlogs, (blogs) => {
    return blogs === Math.max(..._.values(authorBlogs))
  })
  return { author: authorMostBlogs, blogs: authorBlogs[authorMostBlogs] }
}

const mostLikes = (blogs) => {
  const reduceTotal = (sum, blog) => sum + blog['likes']
  const sumByAuthor = (bloglist) => {
    return {
      author: bloglist[0]['author'],
      likes: _.reduce(bloglist, reduceTotal, 0),
    }
  }
  const authorBlogs = _.groupBy(blogs, 'author')
  return _.orderBy(_.map(authorBlogs, sumByAuthor), 'likes', 'desc')[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
