const express = require('express');
const cors = require('cors');
const ENV = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const Note = require('./models/note');

app.get('/', (req, res) => {
  res.send('<h1>Notes API</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()));
  });
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then(savedNote => {
    res.json(savedNote.toJSON());
  })
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(note => {
    res.json(note.toJSON())
  });
})

// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)

//   response.status(204).end()
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});