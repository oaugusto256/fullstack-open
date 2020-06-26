import React, { useState } from "react";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import noteService from "./services/notes";

import "./index.css";

import Notification from "./components/notification";
import Footer from "./components/footer";
import NoteForm from "./components/noteForm";
import Note from "./components/note";
import Notes from "./components/notes";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen"
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      important: false,
      user: "Matti Luukkainen"
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas"
    }
  ]);

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const match = useRouteMatch("/notes/:id");
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null;

  const createNote = ({ noteObject }) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
  };

  const handleShowAll = () => setShowAll(!showAll);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const padding = {
    padding: 5
  };

  return (
    <>
      <>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
      </>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} toggleImportanceOf={toggleImportanceOf} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/">
          <>
            <Notification message={errorMessage} />
            <button onClick={handleShowAll}>
              show {showAll ? "important" : "all"}
            </button>
            <Notes notes={notes} toggleImportanceOf={toggleImportanceOf} />
            <NoteForm createNote={createNote} />
            <Footer />
          </>
        </Route>
      </Switch>
    </>
  );
};

export default App;