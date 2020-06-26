import React from "react";

import Note from "./note";

const Notes = ({ notes, toggleImportanceOf }) => {
  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
    </>
  );
};

export default Notes;
