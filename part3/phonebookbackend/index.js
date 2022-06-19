const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token("reqBody", (req, res) => {
  // return JSON.stringify(req.body);
  return "Yeah I'm not doing that";
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
// app.use(morgan("tiny"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody",
    {
      skip: (request, response) => {
        return request.method !== "POST";
      },
    }
  )
);

// Home
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// API functionalitites
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const requestId = Number(request.params.id);
  const person = persons.find((person) => person.id === requestId);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const requestId = Number(request.params.id);
  const person = persons.find((person) => person.id === requestId);

  if (person) {
    persons = persons.filter((person) => person.id !== requestId);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;
  const newPersonName = newPerson.name ? newPerson.name : null;
  const newPersonNumber = newPerson.number ? newPerson.number : null;
  if (!newPersonName || !newPersonNumber) {
    response.status(400).send("Name and number must be included");
  }
  const personNames = persons.map((person) => person.name);
  if (personNames.includes(newPersonName)) {
    response.status(400).send(`Person ${newPersonName} already exists`);
  }
  const newPersonId = Math.floor(Math.random() * 1000000);
  persons = persons.concat({
    id: newPersonId,
    name: newPersonName,
    number: newPersonNumber,
  });
  response.json(persons.find((person) => person.id === newPersonId));
});

// Info endpoint
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p>\n<p>${new Date()}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
