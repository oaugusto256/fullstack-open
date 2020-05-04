import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import './index.css';

import Note from "./components/note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote('');
  };

  const handleNoteChanges = (event) => setNewNote(event.target.value);

  const handleShowAll = () => setShowAll(!showAll)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          valeu={newNote}
          onChange={handleNoteChanges}
          placeholder="Add new note..."
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
