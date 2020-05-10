const express = require('express');
const app = express();

app.use(express.json());

let persons = [
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

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0;

  return maxId + 1;
};

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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id)

  res.status(204).end();
});

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} persons</p>
    <p>${Date(Date.now())}</p >
  `);
});


app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.phone) {
    return res.status(400).json({
      error: 'name and phone missing'
    });
  };

  const person = {
    name: body.name,
    phone: body.phone,
    id: generateId(),
  }

  persons = persons.concat(person);

  res.json(person);
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});