const express = require('express');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const ENV = require('dotenv').config();
const cors = require('cors');

const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(bodyParser.json());

morganBody(app);

app.use(morgan('combined'));
app.use(express.json());

app.use(express.static('build'));

// app.use(unknownEndpoint);

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// };

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
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

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.phone) {
    return res.status(400).json({ error: 'name and phone missing' });
  };

  const person = new Person({
    name: body.name,
    phone: body.phone
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} persons</p>
    <p>${Date(Date.now())}</p >
  `);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});