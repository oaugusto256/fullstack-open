import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Note from "./components/note";

const notesMock = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
];

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

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
    <App notes={notesMock} />
  </React.StrictMode>,
  document.getElementById('root')
);
