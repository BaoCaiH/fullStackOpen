require('dotenv').config()
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: [true, 'Username required'],
  },
  password: {
    type: String,
    minLength: 3,
    required: [true, 'Password required'],
  },
  name: {
    type: String,
    minLength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
}).set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

module.exports = mongoose.model('User', userSchema)
