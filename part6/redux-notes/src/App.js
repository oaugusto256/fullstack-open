import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import Notes from './components/Notes';
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

import { initializeNotes } from './reducers/noteReducer'

import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch]);

  return (
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  )
}

export default App;