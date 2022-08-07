const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to mongodb...')

const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
