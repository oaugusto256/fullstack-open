import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import noteService from './services/notes';

import './index.css';

import Note from "./components/note";
import Notification from "./components/notification";
import Footer from "./components/footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  };

  const handleNoteChanges = (event) => setNewNote(event.target.value);

  const handleShowAll = () => setShowAll(!showAll)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={handleShowAll}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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
      <Footer />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
