const express = require("express");
const morgan = require("morgan");

morgan.token("body", (req) => {
  console.log(req);
  return JSON.stringify(req.body);
});
const app = express();
app.use(express.json());
app.use(morgan("tiny :body"));

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
  {
    id: 5,
    name: "Danny Debonair",
    number: "6789998212",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const numOfPersons = persons.length;
  response.send(
    `<h1>Phonebook has info for ${numOfPersons} people</h1><p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  console.log(request.params.id);
  const person = persons.find(
    (person) => person.id === Number(request.params.id)
  );

  if (!person) {
    return response.status(404).end();
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const filteredPersons = persons.filter(
    (person) => person.id !== Number(request.params.id)
  );

  response.json(filteredPersons);
});

const generateId = () => {
  const maxId = Math.max(...persons.map((n) => n.id)) + 1;
  return maxId > 0 ? maxId : 1;
};

app.post("/api/persons", (request, response) => {
  const newPerson = {
    id: generateId(),
    name: "John Debonair",
    number: "6789998212",
  };
  response.json(persons.concat(newPerson));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
