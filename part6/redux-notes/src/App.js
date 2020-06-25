import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import Notes from './components/Notes';
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes())
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