require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

morgan.token('reqBody', () => {
  // return JSON.stringify(req.body);
  return 'Yeah I\'m not doing that'
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :reqBody',
    {
      skip: (request) => {
        return request.method !== 'POST'
      },
    }
  )
)

// Home
app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// API functionalitites
app.get('/api/persons', (_request, response) => {
  Person.find({}).then((persons) => {
    console.log('phonebook retrieved')
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        console.log('Found person')
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const newRequestedPerson = request.body
  const newPersonName = newRequestedPerson.name ? newRequestedPerson.name : null
  const newPersonNumber = newRequestedPerson.number
    ? newRequestedPerson.number
    : null
  Person.findOne({ name: newPersonName })
    .then((person) => {
      if (person) {
        response.status(400).send(`Person ${newPersonName} already exists`)
      } else {
        const newPerson = new Person({
          name: newPersonName,
          number: newPersonNumber,
        })
        newPerson
          .save()
          .then(
            console.log(
              `add ${newPersonName} number ${newPersonNumber} to phonebook`
            )
          )
          .then(() => {
            Person.findOne({ name: newPersonName }).then((person) => {
              response.json(person)
            })
          })
          .catch((error) => next(error))
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const newRequestedPerson = request.body
  const newPersonName = newRequestedPerson.name ? newRequestedPerson.name : null
  const newPersonNumber = newRequestedPerson.number
    ? newRequestedPerson.number
    : null
  // if (!newPersonName || !newPersonNumber) {
  //   response.status(400).send("Name and number must be included");
  // }
  const newPerson = {
    name: newPersonName,
    number: newPersonNumber,
  }
  Person.findByIdAndUpdate(request.params.id, newPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

// Info endpoint
app.get('/info', (_request, response) => {
  Person.find({}).then((persons) => {
    console.log('phonebook retrieved')
    response.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p>\n<p>${new Date()}</p>`
    )
  })
})

app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
})
