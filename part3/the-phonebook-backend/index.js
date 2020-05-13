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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      };
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    phone: body.phone
  });

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    phone: body.phone
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(result => {
      res.json(result.toJSON());
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`
      <p>Phonebook has info for ${persons.length} persons</p>
      <p>${Date(Date.now())}</p >
    `);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});