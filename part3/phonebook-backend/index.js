const express = require('express');
const app = express();

app.use(express.json());

const persons = [
  {
    name: "Ada Lovelace",
    id: 2,
    phone: "123"
  },
  {
    name: "Dan Abramov",
    id: 3,
    phone: "123123"
  },
  {
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
    id: 4
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} persons</p>
    <p>${Date(Date.now())}</p >
  `);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});